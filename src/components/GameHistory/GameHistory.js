import { ThemeProvider } from "@react-navigation/native/lib/typescript/src"
import { TouchableNativeFeedbackBase } from "react-native"

export default class GameHistory {
    // Element at the end of the array is the most recent game
    constructor(obj) {
        obj = obj != null ? obj : {}
        this.careerAwareness = obj.careerAwareness != null ? obj.careerAwareness : []
        this.innovation = obj.innovation != null ? obj.innovation : []
        this.steamCareers = obj.steamCareers != null ? obj.steamCareers : []
        this.leadership = obj.leadership != null ? obj.leadership : []
        this.workforceReady = obj.workforceReady != null ? obj.workforceReady : []
        this.date = obj.date != null ? obj.dat : []
    }

    getJSON() {
        return {
            careerAwareness: this.careerAwareness,
            innovation: this.innovation,
            steamCareers: this.steamCareers,
            leadership: this.leadership,
            workforceReady: this.workforceReady,
            date: this.date
        }
    }
}