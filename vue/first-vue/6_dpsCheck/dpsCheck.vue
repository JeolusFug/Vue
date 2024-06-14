<template>
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{ message }}</div>
        <!-- <div id="screen" :class="state">{{ message }}</div> -->
        <div v-show="result.length">
            <!-- v-show와 v-if는 모두 true일때 생기고 false일때 없어지는대
             v-show는 dispaly:none 등을 사용해서 태그는 존재하지만 사용자에게 보여지지 않는다.
             v-if는 태그자체가 주석처리되어 태그자체가 존재하지 않음으로써 사용자에게 보이지 않게 된다. -->
            <div>평균 시간: {{ average }}ms</div>
            <button @click="onReset">리셋</button>
            <ul>
                <li v-for="t in result">
                <div>{{ t }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
    data() {
        return {
            result: [],
            state: 'waiting',
            message: '클릭해서 시작하세요'

        }
    },
    computed : {    // 계산을 template 안에서 하지 않기 위한, 밖에서 하기 위함
        // 데이터를 가공할 때 사용
        // 성능상의 문제 template에서 계산을 하면 페이지가 로드 될때마다 계산을 해야함
        // 만약 message가 있고, 1분이 걸리는 계산이 있다면
        // message만 바꾸는대 계산까지 다시 해버리기 때문에 시간과 성능이 많이 떨어진다.
        // 이를 막아주기 위함
        average() {
            return this.result.reduce((a, c) => a + c, 0) / result.length || 0
            // 위는 result라는 array에 있는 값을 전부 더해주는 것, 마지막의 || 0은 기본값을 0으로 주는법
        }
    },
    methods: {
        onReset() {
            this.result = [];
        },
        onClickScreen() {
            if (this.state === 'waiting') {
                this.state = 'ready';
                this.message = '초록색이 보이면 클릭하세요';
                timeout = setTimeout(() => {
                    this.state = 'now';
                    this.message = '지금 클릭';
                    startTime = new Date();
                }, Math.floor(Math.random() * 1000) + 2000); // 2~3 초
            } else if (this.state === 'ready') {
                clearTimeout(timeout);
                this.state = 'waiting';
                this.message = '예측 금지';
            } else if (this.state === 'now') {
                endTime = new Date();
                this.state = 'waiting';
                this.message = '클릭해서 시작';
                this.result.push(endTime - startTime);
                console.log(this.result);
            }
        }
    },
};
</script>

<style scoped>
#screen {
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
}

#screen.waiting {
    background-color: aqua;
}

#screen.ready {
    background-color: red;
    color: white;
}

#screen.now {
    background-color: greenyellow;
}
</style>
