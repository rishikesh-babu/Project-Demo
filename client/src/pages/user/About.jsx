import { useDispatch, useSelector } from "react-redux"
import { decrement, increment, saveName } from "../../redux/features/counterSlice";

export const About = () => {
    const { countNumber, setSample } = useSelector((state) => state.counter)
    const dispatch = useDispatch()

    function addCount() {
        dispatch(increment())
    }
    function subCount() {
        dispatch(decrement())
    }
    function testSample(event) {
        const inputValue = event.target.value 
        dispatch(saveName(inputValue))
    }

    console.log('setSample :>> ', setSample);

    return (
        <div>
            <input
                type="text"
                onChange={testSample}
                placeholder="Type here"
                className="input input-bordered input-info w-full max-w-xs" 
            />
            <button onClick={() => addCount()} className="btn btn-secondary">Increment</button>
            <button onClick={() => subCount()} className="btn btn-accent">Decrement</button>
            <button className="btn btn-accent"> {setSample} </button>
        </div>
    )
}