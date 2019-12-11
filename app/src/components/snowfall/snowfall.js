import * as React from "react";

import Particles from "react-particles-js";
import moment from "moment";

import "./snowfall.scss";

const snowfall = () => {
    const shouldShowSnowfall = React.useMemo(() => {
        const today = moment();
        const startDateString = '15/12';
        const endDateString = '7/1';

        let startDate, endDate;
        if(today.get('month') == 11){
            startDate = moment(startDateString, 'DD/MM');
            endDate = moment(endDateString, 'DD/MM').year(moment().get('year') + 1);
        } else {
            startDate = moment(startDateString, 'DD/MM').year(moment().get('year') - 1);
            endDate = moment(endDateString, 'DD/MM');
        };

        return today.isBetween(startDate, endDate);
    }, []);
    
    if(!shouldShowSnowfall) {
        return null;
    }

    return (
            <Particles
                className="snowfall"
                canvasClassName="snowfall-canvas"
                params={{
                    particles: {
                        number: {
                            value: 1700,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#ffffff"
                        },
                        shape: {
                            type: "circle",
                            stroke: {
                                width: 0.5,
                                color: "#ffffff"
                            },
                            polygon: {
                                nb_sides: 6
                            }
                        },
                        opacity: {
                            value: 0.8,
                            random: false,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false
                            }
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 40,
                                size_min: 0.1,
                                sync: false
                            }
                        },
                        line_linked: {
                            enable: false,
                            distance: 150
                        },
                        move: {
                            enable: true,
                            speed: 1.7,
                            direction: "bottom",
                            straight: false,
                            random: false,
                            out_mode: "out"
                        }
                    }
                }}
            />
    );
};

export default snowfall;
