<template>
    <td @click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number,
    },
    methods: {
        onClickTd() {
            // 이미 O 혹은 X가 있는 칸을 클릭시 함수가 취소될 수 있도록 중복이 되지 않을 수 있도록
            if (this.cellData) return;

            const rootData = this.$root.$data;
            console.log(rootData);
            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

            let win = false;    // 승리가 아직 없음.
            // 가로 3목으로 승리할 경우
            if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) {
                win = true; // 승리한 게임의 발생
            }
            // 새로 3목으로 승리할 경우
            if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn) {
                win = true; // 승리한 게임의 발생
            }
            // 왼쪽 위부터 오른쪽 아래 3목으로 승리할 경우
            if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn) {
                win = true; // 승리한 게임의 발생
            }
            // 오른쪽 위부터 왼쪽 아래 3목으로 승리할 경우
            if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn) {
                win = true; // 승리한 게임의 발생
            }

            // 승리한 게임이 발생했을때
            if (win) { // 3목을 달성한 경우, 승리
                // 해당 차례가 승리자가 된다.
                rootData.winner = rootData.turn;
                // 차례를 O의 차례로 돌려놓는다.
                rootData.turn = 'O';
                // 게임판을 초기화
                rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];
            } else { // 승리가 아닐 경우, 무승부, 해당 게임은 패배가 없음
                let all = true; // all이 true면 무승부라는 뜻
                rootData.tableData.forEach((row) => {   // 무승부 검사
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });
                if (all) { // 무승부
                    rootData.winner = '';   // 승자 없음
                    rootData.turn = 'O';    // 차례는 O으로 돌아감
                    rootData.tableData = [['', '', ''], ['', '', ''], ['', '', '']];    // 게임판 비우기
                } else {
                    // 승리도 무승부도 아닐 경우, 게임이 계속되고 있을 경우
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O';  // 차례는 O, X 순번대로 돌아간다.
                }
            }
        }
    }
};
</script>