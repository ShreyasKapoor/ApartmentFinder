import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";

export default function Property() {
  const { id } = useParams();
  const url = "http://localhost:6999/property";
  const [property, setProperty] = useState({
    loading: false,
    data: null,
    error: false,
  });
  let content = null;

  useEffect(() => {
    setProperty({
      loading: true,
      data: null,
      error: false,
    });
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId: new String(id) }),
    })
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((d) => {
        setProperty({
          loading: false,
          data: d.property,
          error: false,
        });
      })
      .catch(() => {
        setProperty({
          loading: false,
          data: null,
          error: true,
        });
      });
  }, [url]);

  if (property.error) {
    content = <p>Error! Please try later</p>;
  }

  if (property.loading) {
    content = <Loader></Loader>;
  }

  if (property.data) {
    content = (
      <div>
        <h1 className="text-2xl font-bold">{property.data.propertyId}</h1>
        <div>
          <img
            src={property.data.photos
              .slice(0, 1)
              .map((photo, key) => photo.href)}
            alt={property.data.propertyId}
          />
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
}