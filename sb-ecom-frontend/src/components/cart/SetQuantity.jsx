const SetQuantity = ({ quantity, handleQtyIncrease, handleQtyDecrease, cardCounter = false }) => (
    <div className="flex flex-col items-center gap-1">
        {!cardCounter && <div className="text-gray-500 text-xs font-medium">QUANTITY</div>}
        <div className="flex items-center gap-1">
            <button
                onClick={handleQtyDecrease}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className={`w-7 h-7 flex items-center justify-center border text-sm font-semibold transition ${
                    quantity <= 1 ? "text-gray-400 border-gray-300 cursor-not-allowed" : 
                    "text-gray-700 border-gray-400 hover:bg-gray-100"
                }`}
            >
                −
            </button>

            <div className="px-2 text-sm font-medium text-gray-800">{quantity}</div>

            <button
                onClick={handleQtyIncrease}
                aria-label="Increase quantity"
                className="w-7 h-7 flex items-center justify-center border text-sm font-semibold text-gray-700 border-gray-400 hover:bg-gray-100 transition"
            >
                +
            </button>
        </div>
    </div>
);

export default SetQuantity;
