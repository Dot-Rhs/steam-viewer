
interface IProps {
    state: number
}

interface IUserStates {
    [key: number]: string
}

export const PersonaState = ({ state }: IProps) => {
    const states: IUserStates = {
        0: 'Offline', 1: 'Online', 2: 'Busy', 3: 'Away', 4: 'Snooze', 5: 'looking to trade', 6: 'looking to play'
    }

    return (
        <div>
            <p>Status: <b>{states[state]}</b></p>
        </div>
    )
}