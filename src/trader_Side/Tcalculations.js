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

  const [totalfrabriccostval, settotalfrabriccostval] = useState();
  const calculatewarpweight = () => {
    const warpweight =
      (warpepi * warpfabricwidth * 0.59 * (100 + Number(warpcrimppercent))) /
      (warpcount * 100);
    const grossweight = (warpweight * (100 + 3)) / 100 / 1000;
    setgrosswarpweight(grossweight.toFixed(2));
    const grosswarpweight = grossweight * warpyarnrate;
    setwarpcost(grosswarpweight.toFixed(2));
  };

  const calculateweftweight = () => {
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
    setsizingcost((grosswarpweight * sizingrate).toFixed(2));
  };
  const weavingcostcalculations = () => {
    setweavingcostresult(((weavingcostcal / 100) * weftppi).toFixed(2));
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
  return (
    <div className="calallcontent">
      <div style={{ display: "flex" }}>
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
              <p>Warpp weight : {grosswarpweight}</p>
              <p>Warp cost : {warpcost}</p>
            </div>
          </div>

          {/* sizingcosttt */}
          <div className="sizingcost" >
            <h2>Sizing cost calculations</h2>
            <p>Sizing rate</p>
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
            <p className="oneoutput">The sizing cost is: {sizingcost}</p>
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
              <p>Weft weight : {grossweftweight}</p>
              <p>Weft cost : {weftcost}</p>
            </div>
          </div>
          {/* warvingggcosttt */}
          <div className="sizingcost" >
            <h2>Weaving cost calculations</h2>
            <p>Job work rate</p>
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
              The weaving cost is: {weavingcostresult}
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
          <p>The total cost is: {totalfrabriccostval}</p>
        
      </div>
    </div>
  );
};

export default Tcalculations;
