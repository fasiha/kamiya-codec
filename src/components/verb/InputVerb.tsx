import { useStore } from "@nanostores/preact";
import classify from "godan-ichidan";
import { conjState } from "../../store";
import numbered from "../Numbered";

export default function InputVerb() {
  const { verb, ichidan } = useStore(conjState);
  return (
    <p>
      <label>
        {numbered(1)} Here is my <b>verb</b>!{" "}
        <input
          size={6}
          type="text"
          name="verb"
          value={verb}
          onInput={(e) => {
            const v = (e.target as HTMLInputElement).value;
            conjState.setKey("verb", v);
            conjState.setKey("ichidan", classify(verb) === "ichidan");
          }}
        />
        .
      </label>{" "}
      <label>
        And it’s an
        <ruby>
          一段<rt>ichidan</rt>
        </ruby>{" "}
        る-verb:{" "}
        <input
          type="checkbox"
          name="ichidan"
          checked={ichidan}
          onChange={() => conjState.setKey("ichidan", !ichidan)}
        />
      </label>
    </p>
  );
}
