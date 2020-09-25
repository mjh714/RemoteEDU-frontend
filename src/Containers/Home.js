import React from 'react'

class Home extends React.Component {

    state = {
        quote: {}
    }

    componentDidMount() {
        fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then(data => {
            this.setState({
                quote: data[Math.floor(Math.random() * data.length)]
            })
        })
    }

    render(){
        return(
            <div>
                <h1>Welcome</h1>
            <div className="quote-block" style={{"textAlign": "center"}}  >
                    <blockquote>"{this.state.quote["text"]}"</blockquote>
                <p>
                   By: {this.state.quote["author"] ? this.state.quote["author"] : "Unknown"}
                </p>
            </div>
            </div>
        )
    }
}

export default Home;