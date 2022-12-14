import {Component, useState, useEffect, useCallback, useMemo, useRef, useReducer} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const Form = () => {
    const ref = useRef(null);
    const input = useInputWithValidate('');
    const textArea = useInputWithValidate('');
    const focusFirstTI = () => {
        if (!input.value) {
            ref.current.focus()
        }
    }
    useEffect(() => {
        ref.current.focus()
    }, [])
    const color = input.validateInput() ? 'text-danger' : null;
    return (
        <form className="w-50 border mt-5 p-3 m-auto"
            style={{'overflow': 'hidden', 'position': 'relative'}}>
            <div className="mb-3">
                <input value={`${input.value} / ${textArea.value}`} type='text' className='form-control' readOnly/>
                <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
                <input ref={ref} onInput={input.onChange} 
                    value={input.value}
                    type="email" className={`form-control ${color}`} 
                    id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                <textarea onClick={focusFirstTI} onInput={textArea.onChange} value={textArea.value} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
        </form>
    )
}
function useInputWithValidate(initialValue) {
    const [value, setValue] = useState(initialValue);
    const onChange = event => {
        setValue(event.target.value);
    }
    const validateInput = () => {
        return (value.search(/\d/) >= 0)
    }
    return {value, onChange, validateInput}
}


// class Slider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             autoplay: false,
//             slide: 0
//         }
//     }
//     // componentDidMount() {
//     //     document.title = `Slide: ${this.state.slide}`;
//     // }
//     // componentDidUpdate() {
//     //     document.title = `Slide: ${this.state.slide}`;
//     // }
//     changeSlide = (i) => {
//         this.setState(({slide}) => ({
//             slide: slide + i
//         }))
//     }
//     toggleAutoplay = () => {
//         this.setState(({autoplay}) => ({
//             autoplay: !autoplay
//         }))
//     }
//     render() {
//         return (
//             <Container>
//                 <div className="slider w-50 m-auto">
//                     <img className="d-block w-100" src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
//                     <div className="text-center mt-5">Active slide {this.state.slide} <br/> {this.state.autoplay ? 'auto' : null}</div>
//                     <div className="buttons mt-3">
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(-1)}>-1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={() => this.changeSlide(1)}>+1</button>
//                         <button 
//                             className="btn btn-primary me-2"
//                             onClick={this.toggleAutoplay}>toggle autoplay</button>
//                     </div>
//                 </div>
//             </Container>
//         )
//     }
// }

const countTotal = (num) => {
    // console.log('counting!');
    return num + 10
}

function reducer (state, action) {
    switch(action.type) {
        case 'toggle':
            return {autoplay: !state.autoplay};
        case 'slow':
            return {autoplay: 300}; 
        case 'fast':
            return {autoplay: 500};
        case 'custom':
            return {autoplay: action.payload}
        default:
            throw new Error();     
    }
}
function init(initial) {
    return {autoplay: initial}
}
const Slider2 = ({initial}) => {
    const [slide, setSlide] = useState(0);
    const [input, setInput] = useState(null);
    // const [autoplay, setAutoplay] = useState(false);
    const [state, dispatch] = useReducer(reducer, initial, init); //{autoplay: false}
    function logging() {
        // console.log('log!')
    }
    useEffect(() => {
        // console.log('effect');
        document.title = `Slide: ${slide}`;
        window.addEventListener('click', logging);
        return () => {
            window.removeEventListener('click', logging)
        }
    }, [slide])
    const changeSlide = (i) => {
        setSlide(slide => slide + i)
    }
    // const toggleAutoplay = () => {
    //     setAutoplay(autoplay => !autoplay)
    // }
    const getSomeImages = useCallback(() => {
        // console.log('fetching');
        return [
            'https://picsum.photos/id/106/200/200',
            'https://picsum.photos/id/24/200/200'
        ]
    }, [slide]);
    // const [state, setState] = useState({slide: 0, autoplay: false});
    // const changeSlide = (i) => {
    //     setState(state => ({...state, slide: state.slide + i}));
    // }
    // const toggleAutoplay = () => {
    //     setState(state => ({...state, autoplay: !state.autoplay}))
    // }
    const total = useMemo(() => {
        return countTotal(slide);
    }, [slide]);
    const style = useMemo(() => ({
        color: slide > 4 ? 'red' : 'black'
    }), [slide])
    useEffect(() => {
        // console.log('styles')
    }, [style]);
    const onChange = (e) => {
        setInput(input => e.target.value)
    }
    return (
        <Container>
            <div className="slider w-50 m-auto">``
                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {slide} <br/> 
                {state.autoplay ? (typeof(state.autoplay) === "boolean" ? "auto" : state.autoplay)
                    : null}</div>
                <div style={style} className="text-center mt-5">Total slides: {total}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    {/* <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button> */}
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'toggle'})}>toggle autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'slow'})}>slow autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'fast'})}>fast autoplay</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={(e) => dispatch({type: 'custom', payload: +e.target.textContent})}>1000</button> <br></br>
                    <input onChange={onChange}></input>  
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => dispatch({type: 'custom', payload: +input})}>Custom</button>
                </div>
            </div>
        </Container>
    )
}
const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])
    return (
        <>
           {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" /> )}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);
    
    return (
            <>
                <Form/>
                {/* <Slider/> */}
                <button onClick={() => setSlider(!slider)}>Click</button>
                {slider ? <Slider2 initial={false}/> : null}
            </>
    );
}
export default App;
