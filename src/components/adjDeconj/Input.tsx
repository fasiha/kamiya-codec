import { useStore } from "@nanostores/preact";
import { adjDeconjState } from "../../store";
import numbered from "../Numbered";

export default function InputAdjDeconj() {
  const { input, dictionaryForm, iAdj } = useStore(adjDeconjState);
  return (
    <>
      <p>
        <label>
          {numbered(1)} Here is my <em>conjugated adjective</em>:{" "}
          <input
            size={6}
            type="text"
            value={input}
            onInput={(e) => {
              const v = (e.target as HTMLInputElement).value;
              adjDeconjState.setKey("input", v);
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
              adjDeconjState.setKey("dictionaryForm", v);
              adjDeconjState.setKey("iAdj", v.endsWith("い"));
            }}
          />
          .
        </label>{" "}
        <label>
          Which is an{" "}
          <ruby>
            い<rt>i</rt>
          </ruby>{" "}
          adjective:{" "}
          <input
            type="checkbox"
            name="iAdj"
            checked={iAdj}
            onChange={() => adjDeconjState.setKey("iAdj", !iAdj)}
          />
        </label>
      </p>
    </>
  );
}
