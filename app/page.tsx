// import { LampContainer } from './components/ui/lamp';
import CombineRules from './components/combineRule';
import CreateRule from './components/createRule';
import EvaluateRules from './components/evaluateRule';

export default function Home() {
    return (
        <div>
            <div> <CreateRule />
            </div>
            <div> <CombineRules />
            </div>
            <div> <EvaluateRules />
            </div>
        </div>
        
    );
}