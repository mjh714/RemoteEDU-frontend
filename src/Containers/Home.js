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
            <React.Fragment>
                <body className="page-body" 
                style={{  
                    margin : "0",
                    backgroundImage: `url(${"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2016%2F10%2FTrinity-College-LIBRARY1016.jpg"})`,
                    backgroundPosition: 'center',
                    top: "0",
                    width: "100%",
                    height: "100vh",
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                    }}>
                {this.props.loggedUser ? <h1 style={{"textAlign": "center", "color": "white"}} >Welcome, {this.props.loggedUser.full_name}</h1> : <h1 style={{"textAlign": "center", "color": "white"}}>Welcome</h1>}
                    <div className="quote-block" style={{"textAlign": "center", "color": "white"}}  >
                            <blockquote>"{this.state.quote["text"]}"</blockquote>
                        <p>
                            By: {this.state.quote["author"] ? this.state.quote["author"] : "Unknown"}
                        </p>
                    </div>
                </body>
            </React.Fragment>
        )
    }
}

export default Home;