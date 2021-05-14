import React, { Component } from 'react';

class LevelSelection extends Component {
    render() {
        return (
            <div>
                Select your level:
                <div>
                    <select id="selectLevel" name="level"></select>
                </div>
            </div>
        );
    }
};

export default LevelSelection;