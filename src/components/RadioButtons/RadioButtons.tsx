import React from "react";
import styles from './RadioButtons.module.css';

export interface RadioButtonsGenericType {
    value: string | number,
    name: string
}

export type  RadioButtonsProps<T extends RadioButtonsGenericType> = {
    options: T[];
    setSelected?: (e: React.FormEvent<HTMLInputElement>) => void;
};

export function RadioButtons<T extends RadioButtonsGenericType>(props: RadioButtonsProps<T>) {
    const {setSelected, options} = props;
    return (
        <div className={styles.radioButtonsContainer}>
            {options.map((el, index) =>
                <span
                    key={index}
                    className={styles.input}>
                <input
                    defaultChecked={index === 0}
                    onChange={setSelected}
                    type="radio"
                    value={el.value}
                    name="optionsGroup"/>
                    {el.name}
                </span>
            )}
        </div>
    )
}