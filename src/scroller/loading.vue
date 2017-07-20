<template>
<svg class="haha-scroller-spin" viewBox="0 0 1024 1024" width="32" height="32"><path d="M476.16 102.4l71.68 0 0 204.8-71.68 0 0-204.8Z" fill="#E9E9E9"></path><path d="M685.760604 139.359897l62.076701 35.84-102.4 177.362002-62.076701-35.84 102.4-177.362002Z" fill="#989697"></path><path d="M848.800103 276.168408l35.84 62.076701-177.362002 102.4-35.84-62.076701 177.362002-102.4Z" fill="#9B999A"></path><path d="M921.6 476.16l0 71.68-204.8 0 0-71.68 204.8 0Z" fill="#A3A1A2"></path><path d="M884.640103 685.763902l-35.84 62.076701-177.362002-102.4 35.84-62.076701 177.362002 102.4Z" fill="#ABA9AA"></path><path d="M747.852913 848.800103l-62.076701 35.84-102.4-177.362002 62.076701-35.84 102.4 177.362002Z" fill="#B2B2B2"></path><path d="M547.84 921.6l-71.68 0 0-204.8 71.68 0 0 204.8Z" fill="#BAB8B9"></path><path d="M338.223788 884.640103l-62.076701-35.84 102.4-177.362002 62.076701 35.84-102.4 177.362002Z" fill="#C2C0C1"></path><path d="M175.199897 747.840603l-35.84-62.076701 177.362002-102.4 35.84 62.076701-177.362002 102.4Z" fill="#CBCBCB"></path><path d="M102.4 547.84l0-71.68 204.8 0 0 71.68-204.8 0Z" fill="#D2D2D2"></path><path d="M139.359897 338.245109l35.84-62.076701 177.362002 102.4-35.84 62.076701-177.362002-102.4Z" fill="#DADADA"></path><path d="M276.162695 175.199897l62.076701-35.84 102.4 177.362002-62.076701 35.84-102.4-177.362002Z" fill="#E2E2E2"></path></svg>
</template>

<script>
import './scroller.scss'


export default {
	name:'loading',
}
</script>
<style scoped>
.haha-scroller-spin{
	animation: roll 1s linear infinite;
}
@keyframes roll
{
	from {transform: rotate(0deg);}
	to {transform: rotate(360deg);}
}
</style>
