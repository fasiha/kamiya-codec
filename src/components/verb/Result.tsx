import * as codec from "kamiya-codec";
import { useStore } from "@nanostores/preact";
import { conjState, verbDeconjState } from "../../store";

export default function Result() {
  const { auxs, conj, verb, ichidan } = useStore(conjState);
  if (conj && verb) {
    try {
      const res = codec.conjugateAuxiliaries(verb, auxs, conj, ichidan);
      return (
        <>
          <h3>Result</h3>
          <ul>
            {res.map((s) => (
              <li key={s}>
                {s}{" "}
                <button
                  onClick={() => {
                    verbDeconjState.set({
                      dictionaryForm: verb,
                      input: s,
                      ichidan: ichidan,
                    });
                  }}
                >
                  Try to deconjugate
                </button>
              </li>
            ))}
          </ul>
        </>
      );
    } catch (e) {
      return <h3>Result: (cannot conjugate {String(e)})</h3>;
    }
  }
  return <h3>Result: (awaiting for input)</h3>;
}
