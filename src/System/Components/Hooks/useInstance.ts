import { useRef, useEffect } from "react";

const useInstance = <T, PROPS>(
  instanceConstructor: new (props: PROPS | undefined) => T,
  props: PROPS | undefined
) => {
  const vmRef: any = useRef(null);

  if (!vmRef.current) {
    vmRef.current = new instanceConstructor(props);
  }

  useEffect(() => {
    return () => {
      if (typeof vmRef.current.dispose === "function") {
        vmRef.current.dispose();
      }
    };
  }, [instanceConstructor]);

  useEffect(() => {
    if (typeof vmRef.current.update === "function") {
      vmRef.current.update(props);
    }
  }, [props]);

  return vmRef.current;
};

export default useInstance;
