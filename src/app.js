import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import Card from './components/Card';
import Characters from './characters.json';

let topScore = 0;
let guessesCorrect = 0;
let score = 0;
let message = "";

class App extends Component {

	state = {
		Characters,
		topScore,
		guessesCorrect,
		message, 
		score
	};

	setClicked = id => {
		const Characters = this.state.Characters;
		const cardClicked = Characters.filter(Character => Character.id === id);

		if (cardClicked[0].clicked) {

			guessesCorrect = 0;
			message = 'You Lose!';

			for (let i = 0; i < Characters.length; i++) {
				Characters[i].clicked = false;
			}

			this.setState({message});
			this.setState({guessesCorrect});
			this.setState({Characters});

		} else {
			cardClicked[0].clicked = true;

			guessesCorrect = guessesCorrect + 4;
			message = "Good Job!"

			if (guessesCorrect > topScore) {
				topScore = guessesCorrect;
				score++;
				this.setState({score});
				this.setState({topScore});
				this.renderScore();
			}

			Characters.sort((a, b) => {
				return 0.5 - Math.random();
			});

			this.setState({Characters});
			this.setState({guessesCorrect});
			this.setState({message});
		}
	};

	renderScore() {
		let divs = [];

		for (let i = 0; i < this.state.score; i++) {
			divs.push(<div key={i} className="score"></div>);
		}

		return <div>{divs}</div>;
	};
		
    render() {

        return ( 
        	<Wrapper>
    			<div className="dune">
    				<div className="duneText">
    					<h1 className="banner">Dune memory game</h1>
        				<h3 className="message">{this.state.message}</h3>
    				</div>
    				<div className="buttonWrapper">
    					<img className="buttons" src="images/buttons.png" alt="buttons" />
    				</div>
					<div className="Score">
    				{this.renderScore()}
    			
    				</div>
    			</div>
            	<div className="row">
            		{this.state.Characters.map(Character => (
            			<Card
            				setClicked={this.setClicked}
            				id={Character.id}
            				key={Character.id}
            				image={Character.image}
            				name={Character.name}
            			/>
            		))}
            	</div>
            </Wrapper>
        );
    }
};

export default App;