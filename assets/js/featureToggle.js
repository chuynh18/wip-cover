"use strict";

const featureToggle = {
    "ai": {
        "lookAhead": true,
        "blockThree": true,
        "connectThree": true,
        "avoidNickTrap": true,
        "increaseCenterWeight": false,
        "speed": 650,
        "weightings": {
            "centerWeightValue": 1,
            "centerWeightDuration": 7,
            "blockOpponentWin": 25,
            "winningMove": 100,
            "opponentWouldWin": -70,
            "blockThreeBaseWeight": 10,
            "blockThreeBonusWeightNonVertical": 5,
            "blockThreeBoardEdgeUnweight": -10,
            "connectThreeBaseWeight": 15,
            "connectThreeBoardEdgeUnweight": -10,
            "connectThreeBonusWeightNonVertical": 5,
            "avoidNickTrap": 20
        }
    },
    "logging": {
        "logBestMoves": true,
        "logAIScore": true,
        "logWinDebugInfo": true,
        "logClicks": false,
        "logThrees": true
    },
    "debug": {
        "playButton": false,
        "mlg": false
    }
};