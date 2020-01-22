import React from "react";

const PointsTable = props => (
    <table className="table points-table">
        <thead>
            <tr>
                <th>Value</th>
                <th>Position Points</th>
                <th>Kill Points</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>100</td>
                <td>15</td>
            </tr>
            <tr>
                <td>2</td>
                <td>80</td>
                <td>30</td>
            </tr>
            <tr>
                <td>3</td>
                <td>60</td>
                <td>45</td>
            </tr>
            <tr>
                <td>4</td>
                <td>40</td>
                <td>60</td>
            </tr>
            <tr>
                <td>5</td>
                <td>30</td>
                <td>75</td>
            </tr>
            <tr>
                <td>6</td>
                <td>25</td>
                <td>90</td>
            </tr>
            <tr>
                <td>7</td>
                <td>20</td>
                <td>105</td>
            </tr>
            <tr>
                <td>8</td>
                <td>15</td>
                <td>120</td>
            </tr>
            <tr>
                <td>9</td>
                <td>10</td>
                <td>135</td>
            </tr>
            <tr>
                <td>10</td>
                <td>5</td>
                <td>150</td>
            </tr>
        </tbody>
    </table>
);

export default PointsTable;