import SpinnerComp from "./components/Spinner";

{ loading && <SpinnerComp/>}

const [loading, setLoading] = useState<boolean>(false);

    setLoading(false)
    setLoading(true)