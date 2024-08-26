import React, { useState } from "react";
import { toast } from "react-toastify";
import "../common/static/css/tradercalculations.css";

const Tcalculations = () => {
  const [warpepi, setwarpepi] = useState();
  const [warpfabricwidth, setwarpfabricwidth] = useState();
  const [warpcrimppercent, setwarpcrimppercent] = useState();
  const [warpcount, setwarpcount] = useState();
  const [warpwaste, setwarpwaste] = useState();
  const [warpyarnrate, setwarpyarnrate] = useState();

  const [grosswarpweight, setgrosswarpweight] = useState();
  const [warpcost, setwarpcost] = useState();

  const [weftppi, setweftppi] = useState();
  const [weftfabricwidth, setweftfabricwidth] = useState();
  const [weftcrimppercent, setweftcrimppercent] = useState();
  const [weftcount, setweftcount] = useState();
  const [weftwaste, setweftwaste] = useState();
  const [weftyarnrate, setweftyarnrate] = useState();

  const [grossweftweight, setgrossweftweight] = useState();
  const [weftcost, setweftcost] = useState();

  const [sizingrate, setsizingrate] = useState();
  const [sizingcost, setsizingcost] = useState();

  const [weavingcostcal, setweavingcostcal] = useState();
  const [weavingcostresult, setweavingcostresult] = useState();

  const [loomspeed, setloomspeed] = useState();
  const [efficiency, setefficiency] = useState();
  const [expectedppi, setexpectedppi] = useState();
  const [productiontime, setproductiontime] = useState();

  const[expectedproductionoutput,setexpectedproductionoutput]=useState('')

const[orderquantity,setorderquantity]=useState('')
const[jobworkbillingcost,setjobworkbillingcost]=useState('')
 
  const[orderqual,setorderqual]=useState()
  const [loomspeedtime, setloomspeedtime] = useState();
  const [efficiencytime, setefficiencytime] = useState();
  const [expectedppitime, setexpectedppitime] = useState();

  const[expectedtime,setexpectedtime]=useState()
  const [totalfrabriccostval, settotalfrabriccostval] = useState();
  const calculatewarpweight = () => {
    if(!warpepi ||
      !warpfabricwidth||
      !warpcrimppercent||
      !warpcount||
      !warpwaste||
      !warpyarnrate){
        toast.error("Fill all warp weight fields!")
return
    }
    const warpweight =
      (warpepi * warpfabricwidth * 0.59 * (100 + Number(warpcrimppercent))) /
      (warpcount * 100);
    const grossweight = (warpweight * (100 + 3)) / 100 / 1000;
    setgrosswarpweight(grossweight.toFixed(2));
    const grosswarpweight = grossweight * warpyarnrate;
    setwarpcost(grosswarpweight.toFixed(2));
  };

  const calculateweftweight = () => {
    if(!weftppi ||
      !weftfabricwidth||
      !weftcrimppercent||
      !weftcount||
      !weftwaste||
      !weftyarnrate){
        toast.error("Fill all weft weight fields!")
return
    }
    const weftweight =
      (weftppi * weftfabricwidth * 0.59 * (100 + Number(weftcrimppercent))) /
      (weftcount * 100);
    const grossweight = (weftweight * (100 + 3)) / 100 / 1000;
    setgrossweftweight(grossweight.toFixed(2));
    const grossweftweight = grossweight * weftyarnrate;
    setweftcost(grossweftweight.toFixed(2));
  };
  const sizingratecost = () => {
    if (!grosswarpweight) {
      toast.error("Calculate warp weight first.");
      return;
    }
    if(!sizingrate){
      toast.error('Enter Sizing Rate')
      return;
    }
    setsizingcost((grosswarpweight * sizingrate).toFixed(2));
  };
  const weavingcostcalculations = () => {
    if(!weavingcostcal)
    {
      toast.error('Enter Job Work Rate')
      return;
    }
    setweavingcostresult((weavingcostcal * weftppi).toFixed(2));
  };
  const totalfabriccostcalculation = () => {
    if (!warpcost) {
      toast.error("Calculate warp cost first");
      return;
    }
    if (!weftcost) {
      toast.error("Calculate weft cost first");
      return;
    }
    if (!sizingcost) {
      toast.error("Calculate sizing cost first");
      return;
    }
    if (!weavingcostresult) {
      toast.error("Calculate weaving cost first");
      return;
    }

    settotalfrabriccostval(
      (
        Number(warpcost) +
        Number(weftcost) +
        Number(sizingcost) +
        Number(weavingcostresult)
      ).toFixed(2)
    );
  };

  const jobworkbilling=()=>{
if(!weftppi){
  toast.error('Fill PPI in weft weight calculations')
    return;
}
if(!orderquantity){
  toast.error('Fill Order Quantity')
    return;
}
    const billincost=(weftppi * (orderquantity / 100))

    setjobworkbillingcost(billincost.toFixed(2))
  }

  const calculateexpectedproduction=()=>{
if(!loomspeed||
  !productiontime
||  !efficiency
  ||!expectedppi){
    toast.error('Fill Expected prodcution fields')
    return;
  }
    const firstcal= (loomspeed*productiontime*60*(efficiency/100))/(expectedppi*39.37)
setexpectedproductionoutput(firstcal.toFixed(2))
setorderqual(firstcal.toFixed(2))

  }
  const calculateexptedtime=()=>{
    if(!orderqual||
      !expectedppitime
      ||!loomspeedtime
      ||!efficiencytime){
        toast.error('Fill Expected prodcution time fields')
        return;
    }
const firstcal=(orderqual*expectedppitime*39.37)/(loomspeedtime*60*(efficiencytime/100))
    setexpectedtime(firstcal.toFixed(2))
  }
  return (
    <div className="calallcontent">
      <div className='responsivediv' >
        <div className="main2contentalign">
          {/* warpinggg costttt */}
          <div className="warpweight" >
            <h2>Warp weight calculations</h2>

            <div className="alignnextto">
              <div className="aligncontent">
                <p>EPI</p>
                <input
                  value={warpepi}
                  onChange={(e) => setwarpepi(e.target.value)}
                  type="number"
                />
                <p>Fabric width (inches)</p>
                <input
                  value={warpfabricwidth}
                  onChange={(e) => setwarpfabricwidth(e.target.value)}
                  type="number"
                />
                <p>Warp crimp %</p>
                <input
                  value={warpcrimppercent}
                  onChange={(e) => setwarpcrimppercent(e.target.value)}
                  type="number"
                />
              </div>
              <div className="aligncontent">
                <p>Warp count</p>
                <input
                  value={warpcount}
                  onChange={(e) => setwarpcount(e.target.value)}
                  type="number"
                />
                <p>Warp waste %</p>
                <input
                  value={warpwaste}
                  onChange={(e) => setwarpwaste(e.target.value)}
                  type="number"
                />
                <p>Warp yarn rate (per kg)</p>
                <input
                  value={warpyarnrate}
                  onChange={(e) => setwarpyarnrate(e.target.value)}
                  type="number"
                />
              </div>
            </div>

            <button className="btn2" onClick={calculatewarpweight}>
              Calculate
            </button>
            <div className="output">
              <p>Warp weight : {grosswarpweight?grosswarpweight + ' Kg':''}</p>
              <p>Warp cost : {warpcost?warpcost+' Rs/m':''}</p>
            </div>
          </div>

          {/* sizingcosttt */}
          <div className="sizingcost" >
            <h2>Sizing cost calculations</h2>
            <p>Sizing rate (in Rs)</p>
            <div className="operationsfield">
              <input
                value={sizingrate}
                onChange={(e) => setsizingrate(e.target.value)}
                type="number"
              />
              <button className="btn2" onClick={sizingratecost}>
                Calculate
              </button>
            </div>
            <p className="oneoutput">The sizing cost is: {sizingcost?sizingcost+' Rs':''}</p>
          </div>
        </div>
        <div className="main2contentalign">
          {/* wefttwarrppp */}
          <div className="warpweight" >
            <h2>Weft weight calculations</h2>
            <div className="alignnextto">
              <div className="aligncontent">
                <p>PPI</p>
                <input
                  value={weftppi}
                  onChange={(e) => setweftppi(e.target.value)}
                  type="number"
                />
                <p>Fabric Width (inches)</p>
                <input
                  value={weftfabricwidth}
                  onChange={(e) => setweftfabricwidth(e.target.value)}
                  type="number"
                />
                <p>Weft crimp %</p>
                <input
                  value={weftcrimppercent}
                  onChange={(e) => setweftcrimppercent(e.target.value)}
                  type="number"
                />
              </div>
              <div className="aligncontent">
                <p>Weft count</p>
                <input
                  value={weftcount}
                  onChange={(e) => setweftcount(e.target.value)}
                  type="number"
                />
                <p>Weft waste %</p>
                <input
                  value={weftwaste}
                  onChange={(e) => setweftwaste(e.target.value)}
                  type="number"
                />
                <p>Weft yarn rate (per kg)</p>
                <input
                  value={weftyarnrate}
                  onChange={(e) => setweftyarnrate(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <button className="btn2" onClick={calculateweftweight}>
              Calculate
            </button>
            <div className="output">
              <p>Weft weight : {grossweftweight?grossweftweight+' Kg':''}</p>
              <p>Weft cost : {weftcost?weftcost+' Rs/m':''}</p>
            </div>
          </div>
          {/* warvingggcosttt */}
          <div className="sizingcost" >
            <h2>Weaving cost calculations</h2>
            <p>Job work rate (in Rs)</p>
            <div className="operationsfield">
              <input
                value={weavingcostcal}
                onChange={(e) => setweavingcostcal(e.target.value)}
                type="number"
              />
              <button className="btn2" onClick={weavingcostcalculations}>
                Calculate
              </button>
            </div>
            <p className="oneoutput">
              The weaving cost is: {weavingcostresult?weavingcostresult+' Rs':''}
            </p>
          </div>
        </div>
      </div>
      <div className="totalfabric">
        
          {" "}
          <h2>Total fabric cost calculations</h2>
          <button className="btn2" onClick={totalfabriccostcalculation}>
            Calculate
          </button>
          <p>The total cost is: {totalfrabriccostval?totalfrabriccostval+' Rs':''}</p>
        
      </div>
      <div className="jobworkbiling" >
            <h2>Job work billing calculations</h2>
            <p >Job rate work (in Rs)</p>
            <div className="operationsfield">
              <input
                value={orderquantity}
                onChange={(e) => setorderquantity(e.target.value)}
                type="number"
              />
              <button className="btn2" onClick={jobworkbilling}>
                Calculate
              </button>
            </div>
            <p className="oneoutput">
              Job Work Billing cost is: {jobworkbillingcost?jobworkbillingcost+' Rs':''}
            </p>
          </div>
      {/* expecteddd time etc */}
      <div className='responsivediv'  > 
      <div className="main2contentalign">
        <div className="warpweight" >
            <h2>Expected Prodcution calculations</h2>

            <div className="alignnextto">
              <div className="aligncontent">
                <p>Loom speed</p>
                <input
                  value={loomspeed}
                  onChange={(e) => setloomspeed(e.target.value)}
                  type="number"
                />
                <p>Efficiency %</p>
                <input
                  value={efficiency}
                  onChange={(e) => setefficiency(e.target.value)}
                  type="number"
                />
              
              </div>
              <div className="aligncontent">
                <p>Time</p>
                <input
                  value={productiontime}
                  onChange={(e) => setproductiontime(e.target.value)}
                  type="number"
                />
                <p>PPI</p>
                <input
                  value={expectedppi}
                  onChange={(e) => setexpectedppi(e.target.value)}
                  type="number"
                />
              
              </div>
            </div>

            <button className="btn2" onClick={calculateexpectedproduction}>
              Calculate
            </button>
            <div className="output">
              <p>Expected Production : {expectedproductionoutput && expectedproductionoutput+' meters'}</p>
            
            </div>
          </div></div>
          <div className="main2contentalign">
          <div className="warpweight" >
            <h2>Expected time required for Expected Prodcution  calculations</h2>

            <div className="alignnextto">
              <div className="aligncontent">
                <p>Order Quantity</p>
                <input
                  value={orderqual}
                  onChange={(e) => setorderqual(e.target.value)}
                  type="number"
                />
                <p>Loom Speed</p>
                <input
                  value={loomspeedtime}
                  onChange={(e) => setloomspeedtime(e.target.value)}
                  type="number"
                />
               
              </div>
              <div className="aligncontent">
                <p>Efficiency %</p>
                <input
                  value={efficiencytime}
                  onChange={(e) => setefficiencytime(e.target.value)}
                  type="number"
                />
                <p>PPI</p>
                <input
                  value={expectedppitime}
                  onChange={(e) => setexpectedppitime(e.target.value)}
                  type="number"
                />
                
              </div>
            </div>

            <button className="btn2" onClick={calculateexptedtime}>
              Calculate
            </button>
            <div className="output">
              <p>Expected Time: {expectedtime && expectedtime+' hours'}</p>
           
            </div>
          </div></div>
          </div>
    </div>
  );
};

export default Tcalculations;
