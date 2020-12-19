import React, { useState } from "react";
import { createApi } from "unsplash-js";
import { Skeleton } from "@material-ui/lab";

export default function SearchPhotos() {
  /* Save the current query and the current searchresults in state */
  const [query, setQuery] = useState("");
  const [pics, setPics] = useState([]);
  const [loading, setLoading] = useState(false);

  const unsplash = createApi({
    /* In an actual project the access key would be hidden in another file that's added to .gitignore */
    accessKey: "LsDBF3zFeVXLoMLsQX6K8xEsycJ2ETk5t2tXhgnRqdI",
  });

  const toJson = require("unsplash-js").toJson;

  const searchPhotos = async (e) => {
    e.preventDefault();
    /* Set the loading-state to true to render the skeletonloaders */
    setLoading(true);
    /* Fetch the images using the current query, then convert it to .json-format, finally add the .json results to the pics-state */
    unsplash.search
      .getPhotos({query})
      .then(toJson).then(json => {
        setPics(json.response.results);
        /* The app loads faster than the skeletonloaders, so for solely aesthetic reasons I added a 1 second delay */
        setTimeout(() => { setLoading(false); }, 1000);
      })
      /* Catch any potential errors and print them in console */
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {/* No button to submit the form since there is no button on the AdobeXD design. Submit form by using enter. */
      /* Could add a trigger onChange but it would use up all the API Requests and render the demo unusable after a few tries. */}
      <form className="form" onSubmit={searchPhotos}>
        <input
          type="text"
          name="query"
          className="input"
          placeholder="Search for a picture"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {/* If the loading-state is true, render Skeletonloaders. If the loading-state is false, render the images. */}
      {/* When the loading-state is changed to false it triggers a re-render and the images will render instead of the skeletonloaders */}
      {/* This will cause the illusion of loading-time */}
      {loading ?
        <div className="card-list">
          <Skeleton variant="rect" className="card--image" height={250} />
          <Skeleton variant="rect" className="card--image" height={250} />
          <Skeleton variant="rect" className="card--image" height={250} />
          <Skeleton variant="rect" className="card--image" height={250} />
        </div>
        :
        <div className="card-list">
          {pics.map((pic) =>
            <div className="card" key={pic.id}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="50%"
                height="50%"
                />
            </div>
          )}
        </div>
      }
    </>
  );
}
