

interface ICustomButton {
    text?: string;
    padding?: string;
    color?: string;
    border?: string;
    backgroundColor?: string;
    fontSize?: string;    
    fontWeight?: string;
    icon?: string; 
    onClick?: () => void;
    customId?: string;
}


export const CustomButton: React.FC<ICustomButton> = ({
    text,
    padding,
    color,
    border,
    backgroundColor,
    fontSize, 
    fontWeight,
    icon,
    onClick,
    customId
}) => {
    return (  
        <button className="custom-button" id={customId} style={{ 
            padding,
            color,
            backgroundColor,
            fontSize, 
            fontWeight,
            border        
            }}
            onClick={onClick}
            >
            {text}
            {icon && <img src={icon}/>}
        </button>
    );
};

export default CustomButton;