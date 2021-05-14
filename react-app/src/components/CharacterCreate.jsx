import React, { Component } from 'react';
import LevelSelection from './LevelSelection';

class CharacterCreate extends Component {
    render() {
        return (
            <div>
                <title>Character Creation</title>
                <LevelSelection />
            </div>
        );
    }
};

export default CharacterCreate;