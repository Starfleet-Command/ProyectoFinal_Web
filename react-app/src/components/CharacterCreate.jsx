import React, { Component } from 'react';
import ClassSelection from './ClassSelection';

class CharacterCreate extends Component {
    render() {
        return (
            <div>
                <title>Character Creation</title>
                {/*<LevelSelection />*/}
                <ClassSelection />
            </div>
        );
    }
};

export default CharacterCreate;