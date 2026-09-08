document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       GET MEDIA ELEMENTS
    ========================================================= */

    const mediaTabs = document.querySelectorAll(".media-tabs button");
    const mediaCards = document.querySelectorAll(".media-card");


    /* =========================================================
       CHECK ELEMENTS
    ========================================================= */

    if (!mediaTabs.length || !mediaCards.length) {
        console.warn("Media tabs or media cards were not found.");
        return;
    }


    /* =========================================================
       GET MEDIA TYPE
    ========================================================= */

    function getMediaType(card) {

        const typeElement =
            card.querySelector(".media-type");

        if (!typeElement) {
            return "";
        }

        return typeElement.textContent
            .trim()
            .toLowerCase();

    }


    /* =========================================================
       FILTER MEDIA
    ========================================================= */

    function filterMedia(selectedType) {

        mediaCards.forEach(function (card) {

            const mediaType =
                getMediaType(card);

            let shouldShow = false;


            /* ALL MEDIA */

            if (selectedType === "all") {

                shouldShow = true;

            }


            /* VIDEOS */

            else if (selectedType === "videos") {

                shouldShow =
                    mediaType === "video";

            }


            /* PHOTOGRAPHY */

            else if (selectedType === "photography") {

                shouldShow =
                    mediaType === "photography";

            }


            /* STORIES */

            else if (selectedType === "stories") {

                shouldShow =
                    mediaType === "story";

            }


            /* SHOW / HIDE CARD */

            if (shouldShow) {

                card.style.display = "";

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(10px)";

                requestAnimationFrame(function () {

                    card.style.transition =
                        "opacity 0.3s ease, transform 0.3s ease";

                    card.style.opacity = "1";

                    card.style.transform =
                        "translateY(0)";

                });

            }

            else {

                card.style.display = "none";

            }

        });

    }


    /* =========================================================
       FILTER BUTTONS
    ========================================================= */

    mediaTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            /* Remove active from every tab */

            mediaTabs.forEach(function (item) {

                item.classList.remove("active");

            });


            /* Activate clicked tab */

            tab.classList.add("active");


            /* Get selected category */

            const selectedType =
                tab.getAttribute("data-type") || "all";


            /* Filter cards */

            filterMedia(selectedType);

        });

    });


    /* =========================================================
       MEDIA ACTION LINKS
       
       IMPORTANT:
       These links already contain real URLs in media.html.
       We DO NOT use preventDefault().
       
       Therefore:
       
       Watch video  -> YouTube
       View gallery -> Unsplash
       Read story   -> Polar science website
       
    ========================================================= */

    const mediaLinks =
        document.querySelectorAll(
            ".media-card-body a"
        );


    mediaLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            const card =
                link.closest(".media-card");

            if (!card) {
                return;
            }


            const titleElement =
                card.querySelector("h3");


            const typeElement =
                card.querySelector(".media-type");


            const title =
                titleElement
                    ? titleElement.textContent.trim()
                    : "Media resource";


            const type =
                typeElement
                    ? typeElement.textContent.trim()
                    : "MEDIA";


            console.log(
                "Opening:",
                title,
                "| Type:",
                type
            );

            /*
             * DO NOT prevent the default action.
             *
             * The href from media.html will open normally.
             */

        });

    });


    /* =========================================================
       FEATURED STORY LINK
    ========================================================= */

    const featuredStoryLink =
        document.querySelector(".story-link");


    if (featuredStoryLink) {

        featuredStoryLink.addEventListener(
            "click",
            function () {

                console.log(
                    "Opening featured story: Into the Frozen Frontier"
                );

                /*
                 * Do not use preventDefault().
                 * The YouTube URL in media.html opens normally.
                 */

            }
        );

    }


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    filterMedia("all");


    /* =========================================================
       DEBUG INFORMATION
    ========================================================= */

    console.log(
        "PolarConnect Media loaded successfully."
    );

    console.log(
        "Total media cards:",
        mediaCards.length
    );

});