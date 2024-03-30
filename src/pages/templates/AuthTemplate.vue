<script setup>
</script>

<template>
    <div class="login-container">
        <div class="login-wrapper p-l-110 p-r-110 p-t-62 p-b-33">
            <div class="w-full flex-sb flex-w">
                <span class="login-form-title p-b-53 font-semibold">
                    <slot name="form-title" />
                </span>

                <div class="wrap-input flex flex-column gap-2">
                    <slot name="form-inputs" />
                </div>
                <div class="w-full m-t-17">
                    <slot name="action-button" />
                </div>

                <div class="w-full text-center p-t-55">
                    <slot name="footer-section" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.login-container {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.login-wrapper {
    width: 680px;
    background: #fff;
    border-radius: 10px;
    position: relative;
}

/*==================================================================
[ Form ]*/
.login-form-title {
    width: 100%;
    display: block;
    font-size: 39px;
    color: #50B4AA;
    line-height: 1.2;
    text-align: center;
}

/*------------------------------------------------------------------
[ Input ]*/
.wrap-input {
    width: 100%;
    position: relative;
    border-radius: 10px;
}

/*------------------------------------------------------------------
[ Button ]*/
.login-form-btn {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 40px;
    background-color: #28B498;
    border-radius: 10px;

    font-family: Poppins-Medium;
    font-size: 16px;
    color: #fff;
    line-height: 1.2;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    position: relative;
    z-index: 1;
}

.login-form-btn::before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    top: 0;
    left: 0;
    background: #28B498;
    background: -webkit-linear-gradient(45deg, #359CA0, #38B98C);
    background: -o-linear-gradient(45deg, #359CA0, #38B98C);
    background: -moz-linear-gradient(45deg, #359CA0, #38B98C);
    background: linear-gradient(45deg, #359CA0, #38B98C);
    opacity: 0;
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}

.login-form-btn:hover:before {
    opacity: 1;
}

// Responsiveness
@media(max-width: 768px) {
    .login-wrapper {
        padding-left: 60px;
        padding-right: 60px;
    }
}

@media (max-width: 576px) {
    .login-wrapper {
        padding-left: 15px;
        padding-right: 15px;
    }

}
</style>