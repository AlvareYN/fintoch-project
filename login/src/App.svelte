<script type="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	let visible = false;
	let show = false;
	let email = '';
	let password = '';
	async function handleOnSubmit(e: Event) {
		e.preventDefault();

		const response = await fetch('/auth', {
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password
			}),
			method: 'POST'
		});
		const data = await response.json();
		console.log(data);
		
		if (response.status === 200){
			location.reload()
		}
		
	}

	onMount(() => {
		visible = true;
	});
</script>

<main>
	<div class="container">
		{#if visible}
			<div class="box" transition:fly={{ y: 200, duration: 2000 }}>
				<div class="header">
					<img src="/logo.svg" alt="Fintoch" />
				</div>
				<form on:submit={handleOnSubmit} class="form-content">
					<div class="field">
						<p class="control has-icons-left has-icons-right">
							<input class="input" type="email" placeholder="Email" required bind:value={email} />
							<span class="icon is-small is-left">
								<i class="fas fa-envelope" />
							</span>
						</p>
					</div>
					<div class="field">
						<p class="control has-icons-left">
							<input
								class="input"
								type="password"
								placeholder="Password"
								required
								bind:value={password}
							/>
							<span class="icon is-small is-left">
								<i class="fas fa-lock" />
							</span>
						</p>
					</div>
					<div class="buttons">
						<button class="button is-info">Sign In</button>
						<div class="bottom">
							<a href="/">Forgot Password?</a>
						</div>
					</div>
				</form>
			</div>
		{/if}
	</div>
</main>

<style type="scss">
	$jet: #363636ff;
	$gunmetal: #242f40ff;
	$satin-sheen-gold: #cca43bff;
	$platinum: #e5e5e5ff;
	$white: #ffffffff;
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	.button {
		background-color: $jet;
		color: $white;
		border: none;
		width: 100%;
	}
	.bottom {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: $white;
		min-width: 350px;
		padding: 1.5rem;
		border-radius: 5px;
		.form-content {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			.buttons {
				display: flex;
			}
		}
	}
</style>
