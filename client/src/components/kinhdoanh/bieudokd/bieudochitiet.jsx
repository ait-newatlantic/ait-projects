import React, { useState } from 'react'
import StackChart from "../../chart/stack"
import VerticalChart from "../../chart/vertical"
import { Button } from "react-bootstrap";
import Axios from 'axios';

export default function BDCT (){
    const [year, setYear] = useState('');
    const [yearResult, setYearResult] = useState();

    const Submit = () => {
        Axios.get("http://localhost:8080/api/get/nhucauthucte/bdtq", {
            params: {
                year,
            }
        }).then((response) => {
            setYearResult(response.data);
        });
    }

    return(
        <div>
            <div class="container p-3 my-3 border border-dark">
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label for="exampleFormControlInput1" >Năm</label>
                            <input type="year" className="form-control"
                                id="exampleFormControlInput1" onChange={e => setYear(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <Button block type="submit" onClick={Submit}>
                        Tra cứu
                        </Button>
                </div>
            </div>
            
            <div class="container p-3 my-3 border border-dark">
            <div className="row">
                <div className="col-sm"><StackChart/></div>
                <div className="col-sm"><VerticalChart/></div>
            </div>
            </div>
        </div>
    )
}