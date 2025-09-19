// src/components/SuperHeavyComponent.jsx

import React from "react";
// A importação da lodash inteira infla o tamanho deste chunk!
import _ from "lodash";

const SuperHeavyComponent = () => {
  // Simula um trabalho real que usa a biblioteca
  const data = _.range(0, 500);
  const chunkedData = _.chunk(data, 50);

  console.log("SuperHeavyComponent has been loaded and rendered!");

  return (
    <div className="bg-purple-100 border-2 border-purple-400 p-6 rounded-lg w-full text-center">
      <h3 className="text-2xl font-bold text-purple-800">
        Super Heavy Component
      </h3>
      <p className="text-purple-600 mt-2">
        This component imported the whole lodash library.
      </p>
      <p>Lodash use example:</p>
      <p className="font-mono bg-white p-2 mt-4 rounded text-sm text-left">
        const data = _.range(0, 500); const chunkedData = _.chunk(data, 50);
        <br />
        <strong>Number of "chunks" created: {chunkedData.length}</strong>
      </p>
    </div>
  );
};

export default SuperHeavyComponent;
