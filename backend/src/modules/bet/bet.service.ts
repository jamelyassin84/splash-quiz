import {Injectable} from '@nestjs/common'

@Injectable()
export class BetService {
    getWinningCombination(): number {
        return Math.random() * (10 - 0) + 0
    }
}
