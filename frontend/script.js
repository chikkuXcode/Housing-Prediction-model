const API_URL = "http://127.0.0.1:8000";


async function loadLocations() {

    const select = document.getElementById("location");

    try {

        const response = await fetch(
            `${API_URL}/locations`
        );

        if (!response.ok) {

            throw new Error(
                "Locations load nahi ho rahi hain"
            );

        }

        const locations = await response.json();

        select.innerHTML =
            '<option value="">Select Location</option>';

        locations.forEach(location => {

            const option =
                document.createElement("option");

            option.value = location;

            option.textContent = location;

            select.appendChild(option);

        });

    } catch (error) {

        select.innerHTML =
            '<option value="">Unable to load locations</option>';

        showError(
            "Locations load nahi ho paayi. Backend check karo."
        );

        console.error(error);

    }

}


async function predictHouse() {

    const location =
        document.getElementById("location").value;

    const total_sqft =
        Number(
            document.getElementById("total_sqft").value
        );

    const bath =
        Number(
            document.getElementById("bath").value
        );

    const balcony =
        Number(
            document.getElementById("balcony").value
        );

    const bhk =
        Number(
            document.getElementById("bhk").value
        );


    // Location validation

    if (!location) {

        showError(
            "Please select a location."
        );

        return;
    }


    // Area validation

    if (
        !Number.isFinite(total_sqft) ||
        total_sqft <= 0
    ) {

        showError(
            "Please enter a valid area."
        );

        return;
    }


    if (total_sqft > 50000) {

        showError(
            "Area cannot be more than 50,000 sq.ft."
        );

        return;
    }


    // BHK validation

    if (
        !Number.isInteger(bhk) ||
        bhk < 1
    ) {

        showError(
            "Please select a valid BHK."
        );

        return;
    }


    // Bathroom validation

    if (
        !Number.isInteger(bath) ||
        bath < 0
    ) {

        showError(
            "Please select valid bathrooms."
        );

        return;
    }


    // Balcony validation

    if (
        !Number.isInteger(balcony) ||
        balcony < 0 ||
        balcony > 3
    ) {

        showError(
            "Balcony must be between 0 and 3."
        );

        return;
    }


    // Minimum area according to BHK

    const minimumSqft = {

        1: 300,
        2: 600,
        3: 900,
        4: 1200,
        5: 1500,
        6: 1800,
        7: 2400,
        8: 2400,
        9: 3200,
        10: 3300,
        11: 5000,
        13: 5425,
        16: 10000

    };


    if (!(bhk in minimumSqft)) {

        showError(
            "This BHK is not available in our training data."
        );

        return;
    }


    if (
        total_sqft < minimumSqft[bhk]
    ) {

        showError(
            `For ${bhk} BHK, minimum area should be ${minimumSqft[bhk]} sq.ft.`
        );

        return;
    }


    // Maximum bathrooms according to BHK

    const maximumBath = {

        1: 2,
        2: 4,
        3: 6,
        4: 8,
        5: 7,
        6: 9,
        7: 9,
        8: 8,
        9: 9,
        10: 12,
        11: 12,
        13: 13,
        16: 16

    };


    if (
        bath > maximumBath[bhk]
    ) {

        showError(
            `For ${bhk} BHK, maximum bathrooms allowed are ${maximumBath[bhk]}.`
        );

        return;
    }


    hideError();

    showLoading();


    try {

        const response =
            await fetch(
                `${API_URL}/predict`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        location: location,

                        total_sqft: total_sqft,

                        bath: bath,

                        balcony: balcony,

                        bhk: bhk

                    })

                }
            );


        const data =
            await response.json();


        // Backend error

        if (!response.ok) {

            let message =
                "Prediction failed.";


            if (
                Array.isArray(data.detail)
            ) {

                message =
                    data.detail
                        .map(error => error.msg)
                        .join(", ");

            }

            else if (
                data.detail
            ) {

                message =
                    data.detail;

            }


            throw new Error(message);

        }


        // Prediction successful

        displayResult(data);

    }


    catch (error) {

        showError(
            error.message
        );

        console.error(error);

    }


    finally {

        hideLoading();

    }

}


function displayResult(data) {

    const result =
        document.getElementById("result");


    result.classList.remove("hidden");


    const prices =
        data.predicted_prices;


    document.getElementById(
        "mainPrice"
    ).textContent =
        formatPrice(
            prices["2026"]
        );


    document.getElementById(
        "selectedLocation"
    ).textContent =
        data.location;


    displayPrices(
        prices
    );


    displayFacilities(
        data.nearby
    );


    document.getElementById(
        "displayName"
    ).textContent =
        data.coordinates.display_name;


    document.getElementById(
        "latitude"
    ).textContent =
        `Latitude: ${data.coordinates.latitude}`;


    document.getElementById(
        "longitude"
    ).textContent =
        `Longitude: ${data.coordinates.longitude}`;


    result.scrollIntoView({
        behavior: "smooth"
    });

}


function displayPrices(prices) {

    const container =
        document.getElementById("priceCards");


    container.innerHTML = "";


    Object.entries(prices).forEach(
        ([year, price]) => {

            const card =
                document.createElement("div");


            card.className =
                "price-year";


            card.innerHTML = `

                <div class="year">
                    ${year}
                </div>

                <div class="value">
                    ${formatPrice(price)}
                </div>

            `;


            container.appendChild(card);

        }
    );

}


function displayFacilities(nearby) {

    displayPlaces(
        "hospitals",
        nearby.hospitals
    );


    displayPlaces(
        "schools",
        nearby.schools
    );


    displayPlaces(
        "malls",
        nearby.malls
    );


    displayPlaces(
        "police",
        nearby.police_stations
    );

}


function displayPlaces(elementId, places) {

    const container =
        document.getElementById(elementId);


    container.innerHTML = "";


    if (
        !places ||
        places.length === 0
    ) {

        container.innerHTML = `
            <div class="place">
                <span class="place-name">
                    No named place found nearby
                </span>
            </div>
        `;

        return;

    }


    places.forEach(place => {

        const div =
            document.createElement("div");


        div.className = "place";


        div.innerHTML = `

            <div>

                <div class="place-name">
                    ${escapeHtml(place.name)}
                </div>

                <a
                    href="${place.map_url}"
                    target="_blank"
                    class="map-link"
                >
                    View on Map
                </a>

            </div>

            <span class="distance">
                ${place.distance_km} km
            </span>

        `;


        container.appendChild(div);

    });

}


function formatPrice(price) {

    if (price >= 100) {

        return `₹${(price / 100).toFixed(2)} Crore`;

    }


    return `₹${price.toFixed(2)} Lakh`;

}


function escapeHtml(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


function showLoading() {

    document
        .getElementById("loading")
        .classList.remove("hidden");


    document
        .getElementById("predictBtn")
        .disabled = true;

}


function hideLoading() {

    document
        .getElementById("loading")
        .classList.add("hidden");


    document
        .getElementById("predictBtn")
        .disabled = false;

}


function showError(message) {

    const error =
        document.getElementById("error");


    error.textContent =
        message;


    error.classList.remove("hidden");

}


function hideError() {

    document
        .getElementById("error")
        .classList.add("hidden");

}


loadLocations();