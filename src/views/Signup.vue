<template>
  <div class="card border-0">
    <div class="card-header p-3">
      <h3>Sign Up</h3>
    </div>
    <div class="card-body bg-light card-message">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form>
            <div class="mb-3">
              <label class="form-label"
                >Email</label
              >
              <input
                type="email"
                class="form-control"
                placeholder="mail@gmail.com"
              />
            </div>
            <div class="mb-3">
              <label class="form-label"
                >Password</label
              >
              <input type="password" class="form-control">
            </div>
            <button class="btn btn-primary">Sign Up</button>
            <router-link :to="{ name: 'views.signin' }" class="btn btn-success ms-2">Sign In</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>