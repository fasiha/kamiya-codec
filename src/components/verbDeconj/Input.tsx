import { useStore } from "@nanostores/preact";
import classify from "godan-ichidan";
import { verbDeconjState } from "../../store";
import numbered from "../Numbered";

export default function InputVerb() {
  const { input, dictionaryForm, ichidan } = useStore(verbDeconjState);
  return (
    <>
      <p>
        <label>
          {numbered(1)} Here is my <em>conjugated verb</em>:{" "}
          <input
            size={6}
            type="text"
            value={input}
            onInput={(e) => {
              const v = (e.target as HTMLInputElement).value;
              verbDeconjState.setKey("input", v);
            }}
          />
        </label>
      </p>
      <p>
        <label>
          {numbered(2)} Here’s its dictionary form:{" "}
          <input
            size={6}
            type="text"
            value={dictionaryForm}
            onInput={(e) => {
              const v = (e.target as HTMLInputElement).value;
              verbDeconjState.setKey("dictionaryForm", v);
              verbDeconjState.setKey("ichidan", classify(v) === "ichidan");
            }}
          />
          .
        </label>{" "}
        <label>
          Which is an{" "}
          <ruby>
            一段<rt>ichidan</rt>
          </ruby>{" "}
          る-verb:{" "}
          <input
            type="checkbox"
            name="ichidan"
            checked={ichidan}
            onChange={() => verbDeconjState.setKey("ichidan", !ichidan)}
          />
        </label>
      </p>
    </>
  );
}
