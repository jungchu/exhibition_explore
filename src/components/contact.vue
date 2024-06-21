<template>
    <div id="contact">
        <Toolbar></Toolbar>
        <div id="contactContent">
            <div id="contactTitle">
                覓 巷 
                <span id="contactTitleEn"> MI XIANG </span>
            </div>

            <div id="contactHour">
                <div class="contactSubtitle"> 營業時間 </div>
                <div class="contactText"> 11:00 ~ 14:00 </div>
                <div class="contactText"> 17:00 ~ 21:00 </div>
                <div class="contactText"> (週一公休) </div>
            </div>

            <div id="contactPhone">
                <div class="contactSubtitle"> 聯絡電話 </div>
                <div class="contactText"> XXXX-XXXX </div>
            </div>

            <div id="contactMedia">
                <div 
                    class="contactIcon"
                    @click="goToPage('https://www.instagram.com')"
                >
                    <v-icon icon="mdi-instagram" />
                    <span class="tooltip"> IG 示意 </span>
                </div>

                <div 
                    class="contactIcon"
                    @click="goToPage('https://www.facebook.com')"
                >
                    <v-icon icon="mdi-facebook" />
                    <span class="tooltip"> FB 示意 </span>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script setup>
import Toolbar from './toolbar.vue';
import Footer from './footer.vue';

const goToPage = (url) => {
    window.open(url, '_blank')
}

</script>
<style lang='scss' scoped>
@import '../assets/main.scss';

#contact {
    @include font-zh;
    position: relative;
    width: 100%;
    min-height: calc(100vh - 20px); //因為footer高度大約為 20px
    color: white;

    #contactContent{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: calc(100vh - 20px); //因為footer高度大約為 20px

        #contactTitle {
            width: 300px;
            padding-top: 30px;
            font-size: 28px;
            text-align: center;
            border-top: 1px solid white;
        }

        #contactHour {
            margin: 15px 0;
            text-align: center;
        }

        #contactPhone {
            margin: 15px 0;
            text-align: center;
        }

        #contactMedia {
            display: flex;
            justify-content: center;
            width: 300px;
            margin: 15px 0;
            padding-top: 30px;
            border-top: 1px solid white;

            .v-icon {
                cursor: pointer;
            }

            .contactIcon {
                position: relative;
                margin: 0 10px;

                .tooltip {
                    visibility: hidden;
                    position: absolute;
                    top: 108%;
                    left: 50%;
                    margin-left: -30px; // 置中 tooltip (width/2 = 30)
                    z-index: 1;
                
                    width: 60px;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    border-radius: 6px;
                    padding: 5px 0;
                }
            }

            .contactIcon:hover .tooltip {
                visibility: visible;
            }
        }

        .contactSubtitle {
            margin-bottom: 5px;
            font-size: 20px;
        }
    }

    Footer {
        position: absolute;
        bottom: 0;
    }
}

</style>
