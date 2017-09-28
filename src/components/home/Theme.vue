<template>
<div>
		<p>精选主题</p>

		<div class="theme-list">
			<div><img src="../../assets/images/4.png" alt=""></div>
			<div><img src="../../assets/images/5.png" alt=""></div>
			<div><img src="../../assets/images/6.png" alt=""></div>
		</div>
</div>
</template>

<style lang="less">
	p{
		text-align: center;
		color: #AB956D;
	}
	.theme-list{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		div{
			width: 49.6%;
			&:last-child{
				width: 100%;
			}
		}
		img{
			width: 100%;
			height: 11rem;
		}
	}
</style>