import {Component, useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

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

const Slider2 = (props) => {
    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);
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
    const toggleAutoplay = () => {
        setAutoplay(autoplay => !autoplay)
    }
    const getSomeImages = useCallback(() => {
        console.log('fetching');
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
    return (
        <Container>
            <div className="slider w-50 m-auto">``
                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {slide} <br/> {autoplay ? 'auto' : null}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
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
                {/* <Slider/> */}
                <button onClick={() => setSlider(!slider)}>Click</button>
                {slider ? <Slider2/> : null}
            </>
    );
}
export default App;
