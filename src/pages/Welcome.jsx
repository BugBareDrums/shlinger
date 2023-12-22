import { Link } from "react-router-dom";
import { Window } from "../components/Window";

export const Welcome = () => {
    return (
        <Window className="p-8 max-w-2xl">
            <Window.Img stage="welcome" />
            <Window.Title>welcome to shlinger</Window.Title>
            <div className="text-left">
            <p>this game is all about spreading the festive cheer and letting santa know who's been good and who's been bad amongst your fellow shlingers</p>
            <br/>
            <p className="text-sm">the options you have are:</p>
            <ul className="text-sm list-disc list-inside ml-2">
                <li>make a CLAIM about someone; chose who, tell all</li>
                <li>if enough corroborators back you up it becomes a TRUTH</li>
                <li>if too many people call your claim out it could become a LIE</li>
            </ul>
            <br/>
            <p className="text-sm">
                make sure you also:
            </p>
            <ul className="text-sm list-disc list-inside ml-2">
                <li>refute claims that get thrown your away if you want santa to know you've been good</li>
                <li>jump on others claims to back their claims up and ensure santa knows who's been bad</li>
            </ul>
            <br/>
            <p className="text-sm">once the game ends:</p>
            <ul className="text-sm list-disc list-inside ml-2">
        <li>the score will be calculated and the final naughty list will be revealed using $CANDY and $COAL</li>
            </ul>
            </div>

            <Link to="/accuse" className="block font-bold bg-black text-white m-4 p-2 " >throw your first doo-doo</Link>

        </Window>
    )
}