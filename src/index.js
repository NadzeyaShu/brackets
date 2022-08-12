module.exports =
    function check(str, bracketsConfig) {

        const stack = [];
        const openSet = new Set();
        const equalsBracketSet = new Set();
        const closeOpenMap = new Map();
        bracketsConfig.forEach(bracket => {
            let open = bracket[0];
            let close = bracket[1];
            if (open === close) {
                equalsBracketSet.add(open);
            } else {
                openSet.add(open);
            }
            closeOpenMap.set(close, open);
        })

        function getStackLastElement() {
            return stack.length > 0 ? stack[stack.length - 1] : null;
        }

        for (let i = 0; i < str.length; i += 1) {
            let sElement = str[i];
            if (openSet.has(sElement) || (equalsBracketSet.has(sElement) && getStackLastElement() !== sElement)) {
                stack.push(sElement);
            } else {
                const pop = stack.pop();
                if (pop !== closeOpenMap.get(sElement)) {
                    return false;
                }
            }
        }

        return stack.length === 0;
    }
