/* =============================================================
 * ualberta-links.js
 * =============================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */!function(e){"use strict";var t=function(t,n){this.$element=e(t);this.options=e.extend({},e.fn.linkmod.defaults,n);this.options.parent&&(this.$parent=e(this.options.parent));this.options.toggle&&this.toggle()};t.prototype={constructor:t,dimension:function(){var e=this.$element.hasClass("width");return e?"width":"height"},show:function(){var t,n,r,i;if(this.transitioning)return;t=this.dimension();n=e.camelCase(["scroll",t].join("-"));r=this.$parent&&this.$parent.find("> .accordion-group > .in");if(r&&r.length){i=r.data("linkmod");if(i&&i.transitioning)return;r.collapse("hide");i||r.data("linkmod",null)}this.$element[t](0);this.transition("addClass",e.Event("show"),"shown");e.support.transition&&this.$element[t](this.$element[0][n])},hide:function(){var t;if(this.transitioning)return;t=this.dimension();this.reset(this.$element[t]());this.transition("removeClass",e.Event("hide"),"hidden");this.$element[t](0)},reset:function(e){var t=this.dimension();this.$element.removeClass("collapse")[t](e||"auto")[0].offsetWidth;this.$element[e!==null?"addClass":"removeClass"]("collapse");return this},transition:function(t,n,r){var i=this,s=function(){n.type=="show"&&i.reset();i.transitioning=0;i.$element.trigger(r)};this.$element.trigger(n);if(n.isDefaultPrevented())return;this.transitioning=1;this.$element[t]("in");e.support.transition&&this.$element.hasClass("collapse")?this.$element.one(e.support.transition.end,s):s()},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};e.fn.linkmod=function(n){return this.each(function(){var r=e(this),i=r.data("linkmod"),s=typeof n=="object"&&n;i||r.data("linkmod",i=new t(this,s));typeof n=="string"&&i[n]()})};e.fn.linkmod.defaults={toggle:!0};e.fn.linkmod.Constructor=t;e(function(){e("body").on("click.linkmod.data-api","[data-toggle=linkmod]",function(t){var n=e(this),r,i=n.attr("data-target")||t.preventDefault()||(r=n.attr("href"))&&r.replace(/.*(?=#[^\s]+$)/,""),s=e(i).data("linkmod")?"toggle":n.data();n[e(i).hasClass("link-mod-active")?"addClass":"removeClass"]("link-mod-collapsed");e(i).linkmod(s)})})}(window.jQuery);