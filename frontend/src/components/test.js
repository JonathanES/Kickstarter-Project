import React, {Component} from React;
class Test extends Component{
    state = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    componentDidMount(){
        window.addEventListener('resize', this.handleResize);
    }
    
    componentWillUnMount(){
        window.removeEventListener('resize', this.handleResize);
    
    }
    
    handleResize = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    };
    
    render(){
        return(
            <div>
                <span>width: {this.state.width}</span>
                <span>heigth: {this.state.height}</span>
            </div>
        )
    }
}
