import * as codec from "kamiya-codec";
import { useStore } from "@nanostores/preact";
import { verbDeconjState } from "../../store";

export default function Result() {
  const { input, dictionaryForm, ichidan } = useStore(verbDeconjState);
  if (input && dictionaryForm) {
    try {
      const res = codec.verbDeconjugate(input, dictionaryForm, ichidan);
      return (
        <>
          <h3>Results</h3>
          <ul>
            {res.map((res, idx) => (
              <li key={idx}>
                {dictionaryForm} + ({res.auxiliaries.join("+")}) +{" "}
                {res.conjugation} = {res.result.join("・")}
              </li>
            ))}
          </ul>
        </>
      );
    } catch (e) {
      return <h3>Result: (cannot deconjugate {String(e)})</h3>;
    }
  }
  return <h3>Result: (awaiting for input)</h3>;
}
