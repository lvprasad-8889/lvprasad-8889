import React, { useState } from "react";

// function to show less content initially then showing more content
const Content = (props: any) => {
  const [words, setWords] = useState(props.numberOfWords);
  let totalWordsLength = props.word.split(" ").length;
  return (
    <div>
      {props.word.split(" ").slice(0, words).join(" ")}
      {words < totalWordsLength && (
        <span
          className="globalColor"
          role="button"
          onClick={() => {
            setWords(totalWordsLength);
          }}
        >
          ...read more
        </span>
      )}
      {words === totalWordsLength && (
        <span
          className="globalColor"
          role="button"
          onClick={() => {
            setWords(props.numberOfWords);
          }}
        >
          ...read less
        </span>
      )}
    </div>
  );
};

export default Content;
