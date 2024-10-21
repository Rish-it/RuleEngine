// page.tsx
import CombineRules from "./components/CombineRule";
import CreateRule from "./components/createRule";
import EvaluateRules from "./components/EvaluateRule";



export default function Home() {
   return (
       <div>
           <CreateRule />
           <CombineRules />
           <EvaluateRules />
       </div>
   );
}
