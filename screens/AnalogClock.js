// // import React from 'react';
// // import { View } from 'react-native';
// // import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

// // const AnalogClock = ({ hour, minutes }) => {
// //     const clockSize = 200; // Size of the clock
// //     const centerX = clockSize / 2;
// //     const centerY = clockSize / 2;
// //     const radius = clockSize / 2.2;
// //     const hourHandLength = radius * 0.6;
// //     const minuteHandLength = radius * 0.8;

// //     const hoursAngle = (hour % 12) * 30 + minutes * 0.5; // 360/12 = 30 degrees per hour, +0.5 per minute
// //     const minutesAngle = minutes * 6; // 360/60 = 6 degrees per minute

// //     // Corrected positions for the clock numbers
// //     const numbers = [
// //         { number: '12', x: centerX, y: centerY - radius + 10 },
// //         { number: '1', x: centerX + radius * 0.5, y: centerY - radius * 0.87 },
// //         { number: '2', x: centerX + radius * 0.87, y: centerY - radius * 0.5 },
// //         { number: '3', x: centerX + radius, y: centerY },
// //         { number: '4', x: centerX + radius * 0.87, y: centerY + radius * 0.5 },
// //         { number: '5', x: centerX + radius * 0.5, y: centerY + radius * 0.87 },
// //         { number: '6', x: centerX, y: centerY + radius - 10 },
// //         { number: '7', x: centerX - radius * 0.5, y: centerY + radius * 0.87 },
// //         { number: '8', x: centerX - radius * 0.87, y: centerY + radius * 0.5 },
// //         { number: '9', x: centerX - radius, y: centerY },
// //         { number: '10', x: centerX - radius * 0.87, y: centerY - radius * 0.5 },
// //         { number: '11', x: centerX - radius * 0.5, y: centerY - radius * 0.87 },
// //     ];

// //     return (
// //         <View>
// //             <Svg height={clockSize} width={clockSize} viewBox={`0 0 ${clockSize} ${clockSize}`}>
// //                 <Circle cx={centerX} cy={centerY} r={radius} stroke="black" strokeWidth="2.5" fill="white" />
// //                 <Line
// //                     x1={centerX}
// //                     y1={centerY}
// //                     x2={centerX + hourHandLength * Math.cos(Math.PI * (hoursAngle - 90) / 180)}
// //                     y2={centerY + hourHandLength * Math.sin(Math.PI * (hoursAngle - 90) / 180)}
// //                     stroke="black"
// //                     strokeWidth="4"
// //                 />
// //                 <Line
// //                     x1={centerX}
// //                     y1={centerY}
// //                     x2={centerX + minuteHandLength * Math.cos(Math.PI * (minutesAngle - 90) / 180)}
// //                     y2={centerY + minuteHandLength * Math.sin(Math.PI * (minutesAngle - 90) / 180)}
// //                     stroke="red"
// //                     strokeWidth="3"
// //                 />

// //                 {numbers.map((item, index) => (
// //                     <SvgText
// //                         key={index}
// //                         x={item.x}
// //                         y={item.y}
// //                         fontSize={clockSize / 10} // Adjust font size relative to clock size
// //                         fill="black"
// //                         textAnchor="middle"
// //                     >
// //                         {item.number}
// //                     </SvgText>
// //                 ))}
// //             </Svg>
// //         </View>
// //     );
// // };

// // export default AnalogClock;

// import React from 'react';
// import { View } from 'react-native';
// import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

// const AnalogClock = ({ hour, minutes }) => {
//     const clockSize = 200; // Size of the clock
//     const centerX = clockSize / 2;
//     const centerY = clockSize / 2;
//     const radius = clockSize / 2.2;
//     const hourHandLength = radius * 0.6;
//     const minuteHandLength = radius * 0.8;

//     const hoursAngle = (hour % 12) * 30 + minutes * 0.5; // 360/12 = 30 degrees per hour, +0.5 per minute
//     const minutesAngle = minutes * 6; // 360/60 = 6 degrees per minute

//     // Fine-tuned positions for the clock numbers
//     const numbers = [
//         { number: '12', x: centerX, y: centerY - radius + 15 },
//         { number: '1', x: centerX + radius * 0.5, y: centerY - radius * 0.85 },
//         { number: '2', x: centerX + radius * 0.87, y: centerY - radius * 0.45 },
//         { number: '3', x: centerX + radius * 0.95, y: centerY },
//         { number: '4', x: centerX + radius * 0.87, y: centerY + radius * 0.45 },
//         { number: '5', x: centerX + radius * 0.5, y: centerY + radius * 0.85 },
//         { number: '6', x: centerX, y: centerY + radius - 10 },
//         { number: '7', x: centerX - radius * 0.5, y: centerY + radius * 0.85 },
//         { number: '8', x: centerX - radius * 0.87, y: centerY + radius * 0.45 },
//         { number: '9', x: centerX - radius * 0.95, y: centerY },
//         { number: '10', x: centerX - radius * 0.87, y: centerY - radius * 0.45 },
//         { number: '11', x: centerX - radius * 0.5, y: centerY - radius * 0.85 },
//     ];

//     return (
//         <View>
//             <Svg height={clockSize} width={clockSize} viewBox={`0 0 ${clockSize} ${clockSize}`}>
//                 <Circle cx={centerX} cy={centerY} r={radius} stroke="black" strokeWidth="2.5" fill="white" />
//                 <Line
//                     x1={centerX}
//                     y1={centerY}
//                     x2={centerX + hourHandLength * Math.cos(Math.PI * (hoursAngle - 90) / 180)}
//                     y2={centerY + hourHandLength * Math.sin(Math.PI * (hoursAngle - 90) / 180)}
//                     stroke="black"
//                     strokeWidth="4"
//                 />
//                 <Line
//                     x1={centerX}
//                     y1={centerY}
//                     x2={centerX + minuteHandLength * Math.cos(Math.PI * (minutesAngle - 90) / 180)}
//                     y2={centerY + minuteHandLength * Math.sin(Math.PI * (minutesAngle - 90) / 180)}
//                     stroke="red"
//                     strokeWidth="3"
//                 />

//                 {numbers.map((item, index) => (
//                     <SvgText
//                         key={index}
//                         x={item.x}
//                         y={item.y}
//                         fontSize={clockSize / 10} // Adjust font size relative to clock size
//                         fill="black"
//                         textAnchor="middle"
//                     >
//                         {item.number}
//                     </SvgText>
//                 ))}
//             </Svg>
//         </View>
//     );
// };

// export default AnalogClock;

import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

const AnalogClock = ({ hour, minutes }) => {
    const clockSize = 200; // Size of the clock
    const centerX = clockSize / 2;
    const centerY = clockSize / 2;
    const radius = clockSize / 2.2;
    const hourHandLength = radius * 0.6;
    const minuteHandLength = radius * 0.8;

    const hoursAngle = (hour % 12) * 30 + minutes * 0.5; // 360/12 = 30 degrees per hour, +0.5 per minute
    const minutesAngle = minutes * 6; // 360/60 = 6 degrees per minute

    // Further refined positions for the clock numbers
    const numbers = [
        { number: '12', x: centerX, y: centerY - radius + 20 },
        { number: '1', x: centerX + radius * 0.5, y: centerY - radius * 0.78 + 10 },
        { number: '2', x: centerX + radius * 0.78, y: centerY - radius * 0.5 + 10 },
        { number: '3', x: centerX + radius * 0.89, y: centerY + 5 },
        { number: '4', x: centerX + radius * 0.78, y: centerY + radius * 0.5 },
        { number: '5', x: centerX + radius * 0.5, y: centerY + radius * 0.87 - 10 },
        { number: '6', x: centerX, y: centerY + radius - 9 },
        { number: '7', x: centerX - radius * 0.5, y: centerY + radius * 0.87 - 10 },
        { number: '8', x: centerX - radius * 0.78, y: centerY + radius * 0.5 },
        { number: '9', x: centerX - radius * 0.85, y: centerY + 5 },
        { number: '10', x: centerX - radius * 0.7, y: centerY - radius * 0.5 + 10 },
        { number: '11', x: centerX - radius * 0.39, y: centerY - radius * 0.8 + 10 },
    ];

    return (
        <View>
            <Svg height={clockSize} width={clockSize} viewBox={`0 0 ${clockSize} ${clockSize}`}>
                <Circle cx={centerX} cy={centerY} r={radius} stroke="black" strokeWidth="2.5" fill="white" />
                <Line
                    x1={centerX}
                    y1={centerY}
                    x2={centerX + hourHandLength * Math.cos(Math.PI * (hoursAngle - 90) / 180)}
                    y2={centerY + hourHandLength * Math.sin(Math.PI * (hoursAngle - 90) / 180)}
                    stroke="black"
                    strokeWidth="4"
                />
                <Line
                    x1={centerX}
                    y1={centerY}
                    x2={centerX + minuteHandLength * Math.cos(Math.PI * (minutesAngle - 90) / 180)}
                    y2={centerY + minuteHandLength * Math.sin(Math.PI * (minutesAngle - 90) / 180)}
                    stroke="red"
                    strokeWidth="3"
                />

                {numbers.map((item, index) => (
                    <SvgText
                        key={index}
                        x={item.x}
                        y={item.y}
                        fontSize={clockSize / 10} // Adjust font size relative to clock size
                        fill="black"
                        textAnchor="middle"
                    >
                        {item.number}
                    </SvgText>
                ))}
            </Svg>
        </View>
    );
};

export default AnalogClock;
