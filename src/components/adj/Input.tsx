import { useStore } from "@nanostores/preact";
import { adjState } from "../../store";
import numbered from "../Numbered";

export default function InputVerb() {
  const { adj, iAdj } = useStore(adjState);
  return (
    <p>
      <label>
        {numbered(1)} Here is my <em>adjective</em>!{" "}
        <input
          size={6}
          type="text"
          value={adj}
          onInput={(e) => {
            const v = (e.target as HTMLInputElement).value;
            adjState.setKey("adj", v);
            adjState.setKey("iAdj", v.endsWith("い"));
          }}
        />
      </label>{" "}
      <label>
        And its an{" "}
        <ruby>
          い<rt>i</rt>
        </ruby>{" "}
        adjective:{" "}
        <input
          type="checkbox"
          name="iAdj"
          checked={iAdj}
          onChange={() => adjState.setKey("iAdj", !iAdj)}
        />
      </label>
    </p>
  );
}
