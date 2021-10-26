/*
 * Copyright (C) 2012-2020  Online-Go.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as preferences from "preferences";

let filters: { [key: string]: boolean} = {};
export const profanity_regex: { [key: string]: RegExp } = {};

export function profanity_filter(str: string) {
    for (const lang in filters) {
        str = str.replace(profanity_regex[lang], "$*!%");
    }
    return str;
}
profanity_regex["en"] = new RegExp(atob("KFxiMmcxY1xiKXwoXGJhY3JvdG9tb3BoaWxpYVxiKXwoXGJhbmFsXGIpfChcYmFuaWxpbmd1c1xiKXwoXGJhbnVzXGIpfChcYihhc3N8YXJzZSkoXFcqaG9sZXxcVyptdW5jaCk/XGIpfChcYmF1dG9cVyplcm90aWNcYil8KFxiYmFiZWxhbmRcYil8KFxiYmFieVxXK2JhdHRlclxiKXwoXGJiYWxsXFcrZ2FnXGIpfChcYmJhbGxcVytncmF2eVxiKXwoXGJiYWxsXFcra2lja2luZ1xiKXwoXGJiYWxsXFcrbGlja2luZ1xiKXwoXGJiYWxsXFcrc2Fja1xiKXwoXGJiYWxsXFcrc3Vja2luZ1xiKXwoXGJiYW5nYnJvc1xiKXwoXGJiYXJlYmFja1xiKXwoXGJiYXJlbmFrZWRcYil8KFxiYmFzdGFyZFxiKXwoXGJiYXN0YXJkb1xiKXwoXGJiYXN0aW5hZG9cYil8KFxiYmJ3XGIpfChcYmJkc21cYil8KFxiYmVhdmVyXFcrY2xlYXZlclxiKXwoXGJiZWF2ZXJcVytsaXBzXGIpfChcYmJlbGxcVyplbmRcYil8KFxiYmVzdGlhbGl0eVxiKXwoXGJiaWdcVyticmVhc3RzXGIpfChcYmJpZ1xXK2tub2NrZXJzXGIpfChcYmJpZ1xXK3RpdHNcYil8KFxiYmltYm9zXGIpfChcYmJpcmRsb2NrXGIpfChcYmJpdGNoXGIpfChcYmJsYWNrXFcrY29ja1xiKXwoXGJibG9uZGVcVythY3Rpb25cYil8KFxiYmxvbmRlXFcrb25cVytibG9uZGVcVythY3Rpb25cYil8KFxiYmxvd1xXK2oob2IpP1xiKXwoXGJibG93XFcreW91clxXK2wob2FkKT9cYil8KFxiYmx1ZVxXK3dhZmZsZVxiKXwoXGJibHVtcGtpblxiKXwoXGJib2xsb2Nrc1xiKXwoXGJib25kYWdlXGIpfChcYmJvbmVyXGIpfChcYmJvb2JzP1xiKXwoXGJib290eVxXK2NhbGxcYil8KFxiYnJvd25cVytzaG93ZXJzXGIpfChcYmJydW5ldHRlXFcrYWN0aW9uXGIpfChcYmJ1a2tha2VcYil8KFxiYnVsbGR5a2VcYil8KFxiYnVsbGV0XFcrdmliZVxiKXwoXGJidW5nXFcraG9sZVxiKXwoXGJidW5naG9sZVxiKXwoXGJidXN0eVxiKXwoXGJidXR0Y2hlZWtzXGIpfChcYmJ1Z2dlclxiKXwoXGJjYW1lbFxXK3RvZVxiKXwoXGJjYW1naXJsXGIpfChcYmNhbXNsdXRcYil8KFxiY2Ftd2hvcmVcYil8KFxiY2FycGV0XFcqbXVuY2hlclxiKXwoXGJjaG9jb2xhdGVcVytyb3NlYnVkc1xiKXwoXGJjaXJjbGVqZXJrXGIpfChcYmNsZXZlbGFuZFxXK3N0ZWFtZXJcYil8KFxiY2xpdFx3KlxiKXwoXGJjbGl0b3Jpc1xiKXwoXGJjbG92ZXJcVytjbGFtcHNcYil8KFxiY2x1c3RlcmZ1Y2tcYil8KFxiY29ja3M/XGIpfChcYmNvcHJvbGFnbmlhXGIpfChcYmNvcHJvcGhpbGlhXGIpfChcYmNvcm5ob2xlXGIpfChcYmNyYXBcYil8KFxiY3VtXGIpfChcYmN1bW1pbmdcYil8KFxiY3VubmlsaW5ndXNcYil8KFxiY3VudFx3KlxiKXwoXGJkYW1uXGIpfChcYmRhcmtpZVxiKXwoXGJkYXRlXFcqcmFwZVxiKXwoXGJkZWVwXFcqdGhyb2F0XGIpfChcYmRpY2soXFcqaGVhZHxcVyp3ZWVkKT9cYil8KFxiZGlsZG9cYil8KFxiZGlydHlcVytwaWxsb3dzXGIpfChcYmRpcnR5XFcrc2FuY2hlelxiKXwoXGJkb2coZ2llfGd5KT9cVypzdHlsZVxiKXwoXGJkb2xjZXR0XGIpfChcYmRvbWluYXRyaXhcYil8KFxiZG9tbWVzXGIpfChcYmRvbmtleVxXK3B1bmNoXGIpfChcYmRvdWJsZVxXK2RvbmdcYil8KFxiZG91YmxlXFcrcGVuZXRyYXRpb25cYil8KFxiZG91Y2hlXGIpfChcYmRvdWNoZWJhZ1xiKXwoXGJkcFxXK2FjdGlvblxiKXwoXGJlYXRcVytteVxXK2Fzc1xiKXwoXGJlY2NoaVxiKXwoXGJlamFjdWxhdGlvblxiKXwoXGJlcm90aXNtXGIpfChcYmV1bnVjaFxiKXwoXGJmYWdcYil8KFxiZmFnc1xiKXwoXGJmYWdnb3RcYil8KFxiZmVsY2hcYil8KFxiZmVsbGF0aW9cYil8KFxiZmVsdGNoXGIpfChcYmZlbWFsZVxXK3NxdWlydGluZ1xiKXwoXGJmZW1pP2RvbVxiKXwoXGJmaWdnaW5nXGIpfChcYmZpbmdlcmluZ1xiKXwoXGJmaXN0aW5nXGIpfChcYmZvb3RcVytmZXRpc2hcYil8KFxiZm9vdGpvYlxiKXwoXGJmcm90dGluZ1xiKXwoXGJmdWNrKFx3KnxcVytidXR0b25zKVxiKXwoXGJmdWRnZVxXK3BhY2tlclxiKXwoXGJmdWRnZXBhY2tlclxiKXwoXGJmdXRhbmFyaVxiKXwoXGJnLXNwb3RcYil8KFxiZ2FuZ1xXK2JhbmdcYil8KFxiZ2VuaXRhbHNcYil8KFxiZ2lhbnRcVytjb2NrXGIpfChcYmdpcmxcVytvblxXK3RvcFxiKXwoXGJnaXJsc1xXK2dvbmVcVyt3aWxkXGIpfChcYmdvYXRjeFxiKXwoXGJnb2F0c2VcYil8KFxiZ29ra3VuXGIpfChcYmdvbGRlblxXK3Nob3dlclxiKXwoXGJnb29cVytnaXJsXGIpfChcYmdvb2Rwb29wXGIpfChcYmdvcmVnYXNtXGIpfChcYmdyb3VwXFcrc2V4XGIpfChcYmd1cm9cYil8KFxiaGFuZFxXKmpvYlxiKXwoXGJoZW50YWlcYil8KFxiaG9tb2Vyb3RpY1xiKXwoXGJob25rZXlcYil8KFxiaG9va2VyXGIpfChcYmhvdFxXK2NoaWNrXGIpfChcYmh1bXBpbmdcYil8KFxiaW5jZXN0XGIpfChcYmludGVyY291cnNlXGIpfChcYmphY2tcVytvZmZcYil8KFxiamFpbFxXKmJhaXRcYil8KFxiamVya1xXK29mZlxiKXwoXGJqaShnYXxnZ2F8Z2dlcilib29cYil8KFxiaml6elxiKXwoXGJqdWdnc1xiKXwoXGJraWtlXGIpfChcYmtpbmJha3VcYil8KFxia2lua3N0ZXJcYil8KFxia2lua3lcYil8KFxia25vYmJpbmdcYil8KFxibGVtb25cVytwYXJ0eVxiKXwoXGJsb2xpdGFcYil8KFxibG92ZW1ha2luZ1xiKXwoXGJtYWxlXFcrc3F1aXJ0aW5nXGIpfChcYm1hc3R1cmJhdChlfGlvbnxlc3xpbmd8ZWQpXGIpfChcYm1lbmFnZVxXK2FcVyt0cm9pc1xiKXwoXGJtaWxmXGIpfChcYm1pc3Npb25hcnlcVytwb3NpdGlvblxiKXwoXGJtb3RoZXJmdWNrZXJcYil8KFxibW91bmRcVytvZlxXK3ZlbnVzXGIpfChcYm1yXFcraGFuZHNcYil8KFxibXVmZlxXKmRpdihlfGVyfGluZylcYil8KFxibmFtYmxhXGIpfChcYm5hd2FzaGlcYil8KFxiKG5lbyk/bmF6aXM/XGIpfChcYm5pZ1xXK25vZ1xiKXwoXGJuaWdnYVxiKXwoXGJuaWdnZXJcYil8KFxibmltcGhvbWFuaWFcYil8KFxibmlwcGxlcz9cYil8KFxibnVkKGV8aXR5KVxiKXwoXGJueW1waG8obWFuaWEpP1xiKXwoXGJvY3RvcHVzc3lcYil8KFxib21vcmFzaGlcYil8KFxiKG9uZXwxKVxXK2N1cFxXKyh0d298MilcVytnaXJsc1xiKXwoXGIob25lfDEpXFcrZ3V5XFcrKG9uZXwxKVxXK2phclxiKXwoXGJvcmdhc21cYil8KFxib3JneVxiKXwoXGJwYWVkb3BoaWxlXGIpfChcYnBhbnRpZXNcYil8KFxicGFudHlcYil8KFxicGVkb2JlYXJcYil8KFxicGVkb3BoaWxlXGIpfChcYnBlbmlzXGIpfChcYnBob25lXFcrc2V4XGIpfChcYnBpZWNlcz9cVytvZlxXK3NoaXRcYil8KFxicGlzcyhpbmd8ZWR8XFcqaGVhZHxcVypwaWcpP1xiKXwoXGJwbGF5Ym95XGIpfChcYnBsZWFzdXJlXFcrY2hlc3RcYil8KFxicG9sZVxXK3Ntb2tlclxiKXwoXGJwb255cGxheVxiKXwoXGJwb29wXFcqY2h1dGVcYil8KFxicG9yblxiKXwoXGJwb3Jub1xiKXwoXGJwb3Jub2dyYXBoeVxiKXwoXGJwcmluY2VcVythbGJlcnRcVytwaWVyY2luZ1xiKXwoXGJwdGhjXGIpfChcYnB1YmVzXGIpfChcYnB1c3N5XGIpfChcYnJhZ2hlYWRcYil8KFxicmFnaW5nXFcrYm9uZXJcYil8KFxicmFwKGV8aW5nfGlzdClcYil8KFxicmVjdHVtXGIpfChcYnJldmVyc2VcVytjb3dnaXJsXGIpfChcYnJpbWpvYlxiKXwoXGJyaW1taW5nXGIpfChcYnJvc3lcVytwYWxtKFxXK2FuZFxXK2hlclxXKyhmaXZlfDUpXFcrc2lzdGVycyk/XGIpfChcYnJ1c3R5XFcrdHJvbWJvbmVcYil8KFxicyZtXGIpfChcYnNhZGlzbVxiKXwoXGJzY2F0XGIpfChcYnNjaGxvbmdcYil8KFxic2Npc3NvcmluZ1xiKXwoXGJzZW1lblxiKXwoXGIoZ2F5XFcrfGxlc2JpYW5cVyspP3NleFxiKXwoXGJzZXhvXGIpfChcYnNleHlcYil8KFxic2hhdFxiKXwoXGJzaGF2ZWQoXFcrYmVhdmVyfFxXK3B1c3N5KVxiKXwoXGJzaGVtYWxlXGIpfChcYnNoaWJhcmlcYil8KFxiKGRpcFxXKnxkdW1iXFcqfGJ1bGxcVyopP3NoaXQoenxzfGVkfHl8ZXl8dHl8dGVkfHRpbmd8XFcqaGVhZHM/KT9cYil8KFxic2hvdGFcYil8KFxic2hyaW1waW5nXGIpfChcYnNrYW5rXGIpfChcYnNrdWxsZnVja1xiKXwoXGJzbGFudGV5ZVxiKXwoXGJzbHV0XGIpfChcYnNtdXRcYil8KFxic25hdGNoXGIpfChcYnNvZG9taShzfHopZVxiKXwoXGJzb2RvbXlcYil8KFxic3BpY1xiKXwoXGJzcG9vZ2VcYil8KFxic3ByZWFkXFcrbGVnc1xiKXwoXGJzdHJhcFxXKm9uXGIpfChcYnN0cmFwcGFkb1xiKXwoXGJzdHJpcFxXK2NsdWJcYil8KFxic3R5bGVcVytkb2dneVxiKXwoXGJzdWljaWRlXFcrZ2lybHNcYil8KFxic3VsdHJ5XFcrd29tZW5cYil8KFxic3dpbmdlclxiKXwoXGJ0ZWFcVypiYWdnaW5nXGIpfChcYnRocmVlc29tZVxiKXwoXGJ0aHJvYXRpbmdcYil8KFxidGlnaHRcVyt3aGl0ZVxiKXwoXGJ0aXQoc3x0aWVzfHkpP1xiKXwoXGJ0b25ndWVcVytpblxXK2FcdypcYil8KFxidG9wbGVzc1xiKXwoXGJ0b3NzZXJcYil8KFxidG9zc3BvdFxiKXwoXGJ0b3dlbGhlYWRcYil8KFxidHJhbm55XGIpfChcYnRyaWJhZGlzbVxiKXwoXGJ0dWJcVypnaXJsXGIpfChcYnR1c2h5XGIpfChcYnR3YXRcYil8KFxiKHR3b3wyKVxXK2dpcmxzXFcrKG9uZXwxKVxXK2N1cFxiKXwoXGJ1bmRyZXNzaW5nXGIpfChcYnVwc2tpcnRcYil8KFxidXJldGhyYVxXK3BsYXlcYil8KFxidXJvcGhpbGlhXGIpfChcYnZhZ2luYVxiKXwoXGJ2ZW51c1xXK21vdW5kXGIpfChcYnZpYnJhdG9yXGIpfChcYnZpb2xldChcVytibHVlfFxXK3dhbmQpXGIpfChcYnZvcmFyZXBoaWxpYVxiKXwoXGJ2dWx2YVxiKXwoXGJ3YW5rKGVyfGVkfGluZ3xzdGFpbik/XGIpfChcYndldGJhY2tcYil8KFxid2V0XFcrZHJlYW1cYil8KFxid2hpdGVcVytwb3dlclxiKXwoXGJ3aG9yZVxiKXwoXGJ3b3BcYil8KFxid3JhcHBpbmdcVyttZW5cYil8KFxid3JpbmtsZWRcVytzdGFyZmlzaFxiKXwoXGJ4eHhcYil8KFxieWFvaVxiKXwoXGJ5ZWxsb3dcVytzaG93ZXJzP1xiKXwoXGJ5aWZmeVxiKXwoXGJ6b29waGlsaWFcYik="), "ig");
profanity_regex["de"] = new RegExp(atob("KFxiYW5hbHJpdHRlclxiKXwoXGJhcnNjaFxiKXwoXGJhcnNjaGZpY2tlclxiKXwoXGJhcnNjaGxlY2tlclxiKXwoXGJhcnNjaGxvY2hcYil8KFxiYnJhdHplXGIpfChcYmJ1bXNlblxiKXwoXGJkw7ZkZWxcYil8KFxiZmlja1xiKXwoXGJmaWNrZW5cYil8KFxiZmxpdHRjaGVuXGIpfChcYmZyYXR6ZVxiKXwoXGJnZWlsXGIpfChcYmhhY2tmcmVzc2VcYil8KFxiaHVyZVxiKXwoXGJodXJlbnNvaG5cYil8KFxiaWRpb3RcYil8KFxiaW1tZVxiKXwoXGJpc2NoZVxiKXwoXGJrYWNrYnJhdHplXGIpfChcYmthY2tlXGIpfChcYmthY2tlblxiKXwoXGJrYW1wZmxlc2JlXGIpfChcYmxhdHRlXGIpfChcYmzDvG1tZWxcYil8KFxiTUlMRlxiKXwoXGJtw7Zwc2VcYil8KFxibW9yZ2VubGF0dGVcYil8KFxibcO2c2VcYil8KFxibXVmdGlcYil8KFxibXVzY2hpXGIpfChcYm5hY2t0XGIpfChcYm5pcHBlbFxiKXwoXGJvbmFuaWVyZW5cYil8KFxicGltbWVsXGIpfChcYnBpbXBlcm5cYil8KFxicGlua2VsblxiKXwoXGJwaXNzZW5cYil8KFxicGlzc2VyXGIpfChcYnBvcGVsXGIpfChcYnBvcHBlblxiKXwoXGJwb3Jub1xiKXwoXGJyZXVkaWdcYil8KFxicm9zZXR0ZVxiKXwoXGJzY2hhYnJhY2tlXGIpfChcYnNjaGVpw59lXGIpfChcYmNobmFja2VsblxiKXwoXGJ0aXR0Y2hlblxiKXwoXGJ0aXR0ZW5cYil8KFxid2ljaHNlblxiKXwoXGJ3aWNoc2VyXGIp"), "ig");
profanity_regex["es"] = new RegExp(atob("KFxiYXNub1xiKXwoXGJiYXN0YXJkb1xiKXwoXGJjb25jaGFcYil8KFxiaW5maWVybm9cYil8KFxibWFsZGl0b1xiKXwoXGJtYXJ0aWxsb1xiKXwoXGJ2ZXRlXFcrYVxXK2xhXFcrbWllcmRhXGIpfChcYkNhYnJvblxiKXwoXGJDYWJyw7NuXGIpfChcYkZvbGxhclxiKXwoXGJGb2xsYWRvclxiKXwoXGJHaWxpcG9sbGFzXGIpfChcYkdpbGlwaWNoaXNcYil8KFxiSGlqb3B1dGFcYil8KFxiSGlqb1xXK2RlXFcrcHV0YVxiKXwoXGJIaWphcHV0YVxiKXwoXGJIaWphXFcrZGVcVytwdXRhXGIpfChcYkltYsOpY2lsXGIpfChcYklkaW90YVxiKXwoXGJKaWxpcG9sbGFzXGIpfChcYkthcHVsbG9cYil8KFxiTGFtZWN1bG9zXGIpfChcYk1hcmljw7NuXGIpfChcYk1hcmljYVxiKXwoXGJNYXJpY29uYXpvXGIpfChcYlNvcGxhZ2FpdGFzXGIpfChcYlNvcGxhcG9sbGFzXGIpfChcYlZlcmdhXGIpfChcYlBpbmNoZVxiKXwoXGJDb25jaGFcVytkZVxXK3R1XFcrbWFkcmVcYil8KFxiTWllcmRhXGIpfChcYkNodXBhcG9sbGFzXGIpfChcYlJhY2lzdGFcYil8KFxiSGFjaWVuZG9cVytlbFxXK2Ftb3JcYil8KFxiUGV6w7NuXGIpfChcYkZpZXN0YVxXK2RlXFcrc2FsY2hpY2hhc1xiKXwoXGJQdXRhXGIpfChcYlJhbWVyYVxiKXwoXGJUcmF2ZXN0aVxiKXwoXGJWdWx2YVxiKXwoXGJQcm9zdGl0dXRhXGIpfChcYlPDoWRpY29cYil8KFxiUGVydmVydGlkb1xiKXwoXGJTZXhvXGIpfChcYlNleG9cVytvcmFsXGIpfChcYkNodXBldMOzblxiKXwoXGJIZXJvw61uYVxiKXwoXGJEcm9nYXNcYil8KFxiVHJpb1xiKXwoXGJDb3Byb2ZhZ8OtYVxiKXwoXGJDdWxvXGIpfChcYlBlZG9cYil8KFxiRXNwZXJtYVxiKXwoXGJTZW1lblxiKXwoXGJOYXppXGIpfChcYkFzZXNpbmF0b1xiKXwoXGJQaXNcYil8KFxiQ2FjYVxiKXwoXGJUZXRhc1xXK2dyYW5kZXNcYil8KFxiTWFtYWRhXGIpfChcYkNodXBhZGFcYil8KFxiSGFjZXJcVyt1bmFcVytwYWphXGIpfChcYkNvw7FvXGIpfChcYkJvbGxlcmFcYil8KFxiVMOtYVxXK2J1ZW5hXGIpfChcYk1hY2l6YVxiKXwoXGJNYWNpem9ycmFcYil8KFxiT3JpbmFcYik="), "ig");
profanity_regex["fr"] = new RegExp(atob("KFxiYWxsdW3DqVxiKXwoXGJhbGx1bcOpZVxiKXwoXGJiYWlzZXJcYil8KFxiYmFuZGVyXGIpfChcYmJpZ29ybmV0dGVcYil8KFxiYml0ZVxiKXwoXGJiaXR0ZVxiKXwoXGJibG9ibG9zXGIpfChcYmJvcmRlbFxiKXwoXGJib3NzZXJcYil8KFxiYm91cnLDqVxiKXwoXGJib3VycsOpZVxiKXwoXGJicmFubGFnZVxiKXwoXGJicmFubGVyXGIpfChcYmJyYW5sZXR0ZVxiKXwoXGJicmFubGV1clxiKXwoXGJicmFubGV1c2VcYil8KFxiYnJvdXRlclxXK2xlXFcrY3Jlc3NvblxiKXwoXGJjYWNhXGIpfChcYmNhaWxsZXJcYil8KFxiY2hhdHRlXGIpfChcYmNoaWFzc2VcYil8KFxiY2hpZXJcYil8KFxiY2hpb3R0ZXNcYil8KFxiY2lyZXJcYil8KFxiY2xpdG9cYil8KFxiY2xpdG9yaXNcYil8KFxiY29uXGIpfChcYmNvbm5lXGIpfChcYmNvbm5hcmRcYil8KFxiY29ubmFzc2VcYil8KFxiY291aWxsZXNcYil8KFxiY3JhbW91aWxsZVxiKXwoXGJjdWxcYil8KFxiZMOpY29ubmVcYil8KFxiZMOpY29ubmVyXGIpfChcYmRvdWRvdW5lc1xiKXwoXGJkcmFndWVcYil8KFxiZW1tZXJkYW50XGIpfChcYmVtbWVyZGV1clxiKXwoXGJlbW1lcmRldXNlXGIpfChcYmVtbWVyZGVyXGIpfChcYmVuY3Vsw6lcYil8KFxiZW5jdWzDqWVcYil8KFxiZW5mb2lyw6lcYil8KFxiZW5mb2lyw6llXGIpfChcYsOpdHJvblxiKXwoXGJmaWxzXFcrZGVcVytwdXRlXGIpfChcYmZpbGxlXFcrZGVcVytwdXRlXGIpfChcYmZsaWNcYil8KFxiZm9sbGVcYil8KFxiZm91dHJlXGIpfChcYmdlcmJlclxiKXwoXGJnb3VpbmVcYil8KFxiZ3JhbmRlXFcrZm9sbGVcYil8KFxiZ3JvZ25pYXNzZVxiKXwoXGJndWV1bGVcYil8KFxiam91aXJcYil8KFxibGFcVytwdXRhaW5cVytkZVxXK3RhXFcrbcOocmVcYil8KFxiTUFMUFRcYil8KFxibWFxdWVyZWF1XGIpfChcYm1lbG9uXGIpfChcYm3DqW5hZ2VcVythXFcrdHJvaXNcYil8KFxibWVyZGVcYil8KFxibWVyZGV1c2VcYil8KFxibWVyZGV1eFxiKXwoXGJtZXJsYW5cYil8KFxibWV1ZlxiKXwoXGJtb3J1ZVxiKXwoXGJtb3VsZVxiKXwoXGJuw6hncmVcYil8KFxibmlxdWVcVyt0YVxXK23DqHJlXGIpfChcYm5vdW5lXGIpfChcYnBhbHVjaGVyXGIpfChcYnDDqWRhbGVcYil8KFxicMOpZMOpXGIpfChcYnDDqXRlclxiKXwoXGJwaXBlXGIpfChcYnBpcGlcYil8KFxicGlzc2VyXGIpfChcYnBvaWx1XGIpfChcYnBvdWZmaWFzc2VcYil8KFxicG91c3NlLWNyb3R0ZVxiKXwoXGJwdXRhaW5cYil8KFxicHV0ZVxiKXwoXGJxdWV1ZVxiKXwoXGJyYW1vbmVyXGIpfChcYnNhbGF1ZFxiKXwoXGJzYWxvcGVcYil8KFxic2VyaW5cYil8KFxic2VydmljZVxXK3Ryb2lzXFcrcGnDqGNlc1xiKXwoXGJzdWNlXGIpfChcYnRhbnRlXGIpfChcYnRhcGV0dGVcYil8KFxidGV1ZlxiKXwoXGJ0aXJlclxiKXwoXGJ0cmlja1xiKXwoXGJ0cmluZ2xlXGIpfChcYnRyaW5nbGVyXGIpfChcYnRyaXF1ZVxiKXwoXGJ0cm91XFcrZHVcVytjdWxcYil8KFxidHVybHV0ZVxiKXwoXGJ2ZXV2ZVxiKXwoXGJ2aWFuZGVcVythXFcrcG5ldXNcYik="), "ig");
profanity_regex["it"] = new RegExp(atob("KFxiYW1tdWNjaGlhdGFcYil8KFxiYW5hbGVcYil8KFxiYXJyYXBhdG9cYil8KFxiYXJydXNhXGIpfChcYmFycnVzb1xiKXwoXGJhc3NhdGFuYXRvXGIpfChcYmJhZ2FzY2lhXGIpfChcYmJhZ25hcnNpXGIpfChcYmJhbGRyYWNjYVxiKXwoXGJiYWxsZVxiKXwoXGJiYXR0b25hXGIpfChcYmJlbGlub1xiKXwoXGJiaWdhXGIpfChcYmJvY2NoaW5hcmFcYil8KFxiYm9jY2hpbm9cYil8KFxiYm9maWxvXGIpfChcYmJvaWF0YVxiKXwoXGJib3JkZWxsb1xiKXwoXGJicmluY2FcYil8KFxiYnVjYWlvbG9cYil8KFxiYnVkacO5bG9cYil8KFxiYnVvbmFcVytkb25uYVxiKXwoXGJidXNvbmVcYil8KFxiY2FjY2FcYil8KFxiY2FjaW9jYXBwZWxsYVxiKXwoXGJjYWdhcmVcYil8KFxiY2FnYXRhXGIpfChcYmNhZ25hXGIpfChcYmNhcHBlbGxhXGIpfChcYmNhc2NpXGIpfChcYmNhenphdGFcYil8KFxiY2F6emltbWFcYil8KFxiY2F6em9cYil8KFxiY2hlY2NhXGIpfChcYmNoaWFwcGFcYil8KFxiY2hpYXZhcmVcYil8KFxiY2hpYXZhdGFcYil8KFxiY2lvc3BvXGIpfChcYmNpdWNjaWFtaVxXK2lsXFcrY2F6em9cYil8KFxiY29nbGlvbmVcYil8KFxiY29nbGlvbmlcYil8KFxiY29ybnV0b1xiKXwoXGJjb3p6YVxiKXwoXGJjdWxhdHRpbmFcYil8KFxiY3VsYXR0b25lXGIpfChcYmN1bG9cYil8KFxiZGlcVyttZXJkYVxiKXwoXGJkaXRhbGlub1xiKXwoXGJmYXZhXGIpfChcYmZlbW1pbnVjY2lhXGIpfChcYmZpY2FcYil8KFxiZmlnYVxiKXwoXGJmaWdsaW9cVytkaVxXK2J1b25hXFcrZG9ubmFcYil8KFxiZmlnbGlvXFcrZGlcVytwdXR0YW5hXGIpfChcYmZpZ29uZVxiKXwoXGJmaW5vY2NoaW9cYil8KFxiZm90dGVyZVxiKXwoXGJmb3R0ZXJzaVxiKXwoXGJmcmFjaWNvbmVcYil8KFxiZnJlZ25hXGIpfChcYmZyb2Npb1xiKXwoXGJmcm9zY2lvXGIpfChcYmdvbGRvbmVcYil8KFxiZ3JpbGxldHRvXGIpfChcYmd1YXJkb25lXGIpfChcYmluY2F6emFyc2lcYil8KFxiaW5jb2dsaW9uaXJzaVxiKXwoXGJpbmdvaW9cYil8KFxibGVjY2FjdWxvXGIpfChcYmxlY2NoaW5vXGIpfChcYmxvZmFyZVxiKXwoXGJsb2ZmYVxiKXwoXGJsb2ZmYXJlXGIpfChcYm1lcmRhXGIpfChcYm1lcmRhdGFcYil8KFxibWVyZG9zb1xiKXwoXGJtaWdub3R0YVxiKXwoXGJtaW5jaGlhXGIpfChcYm1pbmNoaW9uZVxiKXwoXGJtb25hXGIpfChcYm1vbmdvbGlub1xiKXwoXGJtb25nb2xvXGIpfChcYm1vbmdvbG9pZGVcYil8KFxibW9udGFcYil8KFxibW9udGFyZVxiKXwoXGJtdXNzYVxiKXwoXGJuZWdyb1xiKXwoXGJuZXJjaGlhXGIpfChcYnBhZHVsb1xiKXwoXGJwYWxsZVxiKXwoXGJwYWxsb3NvXGIpfChcYnBhdGFjY2FcYil8KFxicGF0b256YVxiKXwoXGJwZWNvcmluYVxiKXwoXGJwaWNpb1xiKXwoXGJwaW5jYXJlXGIpfChcYnBpcHBhXGIpfChcYnBpcHBvbmVcYil8KFxicGlww6xcYil8KFxicGlybGFcYil8KFxicGlzY2lhcmVcYil8KFxicGlzY2lvXGIpfChcYnBpc2VsbG9cYil8KFxicG9sZW50b25lXGIpfChcYnBvbWljaWFyZVxiKXwoXGJwb21wYVxiKXwoXGJwb21waW5vXGIpfChcYnBvcmNhXGIpfChcYnBvcmNhXFcrbWFkb25uYVxiKXwoXGJwb3JjYVxXK21pc2VyaWFcYil8KFxicG9yY2FcVytwdXR0YW5hXGIpfChcYnBvcmNvXFcrZHVlXGIpfChcYnBvcmNvXFcremlvXGIpfChcYnBvdHRhXGIpfChcYnB1dHRhbmFcYil8KFxicmVjY2hpb25lXGIpfChcYnJpbmNvZ2xpb25pcmVcYil8KFxicm9tcGliYWxsZVxiKXwoXGJydWZmaWFub1xiKXwoXGJzYm9ycmFcYil8KFxic2JvcnJhcmVcYil8KFxic2JvcnJhdGFcYil8KFxic2Jvcm9uZVxiKXwoXGJzYm9ycm9uZVxiKXwoXGJzY29wYXJlXGIpfChcYnNjb3BhdGFcYil8KFxic2NvcnJlZ2dpYXJlXGIpfChcYnNlZ2FcYil8KFxic2xpbmd1YXJlXGIpfChcYnNsaW5ndWF0YVxiKXwoXGJzbWFuZHJhcHBhdGFcYil8KFxic29jY2lhXGIpfChcYnNvY21lbFxiKXwoXGJzb3JjYVxiKXwoXGJzcG9tcGluYXJlXGIpfChcYnN0aWNjaGlvXGIpfChcYnN0cm9uemFcYil8KFxic3Ryb256YXRhXGIpfChcYnN0cm9uem9cYil8KFxic3ZlbHRpbmFcYil8KFxic3ZlcmdpbmFyZVxiKXwoXGJ0YXJ6YW5lbGxvXGIpfChcYnRlcnJvbmVcYil8KFxidGVzdGFcVytkaVxXK2NhenpvXGIpfChcYnRldHRlXGIpfChcYnRvcGFcYil8KFxidHJvaWFcYil8KFxidHJvbWJhcmVcYil8KFxidmFmZmFuY3Vsb1xiKXwoXGJ2YW5nYXJlXGIpfChcYnppbm5lXGIpfChcYnpvY2NvbGFcYik="), "ig");
profanity_regex["ja"] = new RegExp(atob("KFxiM3BcYil8KFxiZ1xXK+OCueODneODg+ODiFxiKXwoXGJzXFcr77yGXFcrbVxiKXwoXGJzbVxiKXwoXGJzbeWls+eOi1xiKXwoXGJ4eFxiKXwoXGLjgYTjgZ/jgZrjgolcYil8KFxi44GK44GX44Gj44GTXGIpfChcYuOBiuOBl+OCilxiKXwoXGLjgYrjgZfjgorjga7jgYLjgapcYil8KFxi44GK44Gj44Gx44GEXGIpfChcYuOBiuOCguOCieOBl1xiKXwoXGLjgYrlsLtcYil8KFxi44GX44Gw44KKXGIpfChcYuOBoeOCk+OBk1xiKXwoXGLjgarjgoFcYil8KFxi44G144Gf44Gq44KKXGIpfChcYuOBtuOBo+OBi+OBkVxiKXwoXGLjgb3jgaPjgaHjgoPjgopcYil8KFxi44G+44KT44GTXGIpfChcYuOChOOBiuOBhFxiKXwoXGLjgoTjgorjgb7jgpNcYil8KFxi44Ki44K444Ki44Gu44GL44KP44GE44GE5aWz44Gu5a2QXGIpfChcYuOCouOCueODm+ODvOODq1xiKXwoXGLjgqLjg4rjg6rjg7PjgrDjgrlcYil8KFxi44Ki44OK44OrXGIpfChcYuOCpOODqeODnuODgeOCqlxiKXwoXGLjgqbjgqfjg5bjgqvjg6Hjg6lcYil8KFxi44Ko44Kv44K544K/44K344O8XGIpfChcYuOCqOOCueOCs+ODvOODiFxiKXwoXGLjgqjjg4Pjg4FcYil8KFxi44Ko44Ot44OG44Kj44K644OgXGIpfChcYuOCqOODreODhuOCo+ODg+OCr1xiKXwoXGLjgqrjgqvjg55cYil8KFxi44Kq44K344OqXGIpfChcYuOCquODg+ODkeOCpFxiKXwoXGLjgqrjg4rjg4vjg7xcYil8KFxi44Kq44Oe44Oz44KzXGIpfChcYuOCquODvOOCrOOCuuODoFxiKXwoXGLjgqvjg7Pjg4hcYil8KFxi44Kr44O844Oe44K544O844OI44OpXGIpfChcYuOCr+ODquODiOODquOCuVxiKXwoXGLjgq/jg7Pjg4vjg6rjg7PjgrDjgrlcYil8KFxi44Kw44Or44O844OX44O744K744OD44Kv44K5XGIpfChcYuOCsOODrVxiKXwoXGLjgrLjgqTjga7nlLfmgKdcYil8KFxi44Ky44Kk44Oc44O844KkXGIpfChcYuOCsuOCpOODu+OCu+ODg+OCr+OCuVxiKXwoXGLjgrPjgqvjgqTjg7NcYil8KFxi44K044OD44Kv44OzXGIpfChcYuOCtOODvOODq+ODh+ODs+OCt+ODo+ODr+ODvFxiKXwoXGLjgrXjg4fjgqPjgrrjg6BcYil8KFxi44K544Km44Kj44Oz44Ks44O8XGIpfChcYuOCueOCq+ODiOODrVxiKXwoXGLjgrnjgqvjg7zjg4jjga7kuK1cYil8KFxi44K544OI44Op44OD44OX44Kq44OzXGIpfChcYuOCueODiOODquODg+ODl+WKh+WgtFxiKXwoXGLjgrnjg6njg4Pjg4hcYil8KFxi44K544Oq44OD44OIXGIpfChcYuOCu+OCr+OCt+ODvOOBqlxiKXwoXGLjgrvjgq/jgrfjg7zjgapcVysxMFxXK+S7o1xiKXwoXGLjgrvjg4Pjgq/jgrlcYil8KFxi44K944OJ44Of44O8XGIpfChcYuODhuODrOODleOCqeODs+OCu+ODg+OCr+OCuVxiKXwoXGLjg4fjgqPjg4Pjgq9cYil8KFxi44OH44Kj44Or44OJXGIpfChcYuODh+OCo+ODvOODl+ODu+OCueODreODvOODiFxiKXwoXGLjg4fjg5ZcYil8KFxi44OH44O844OI44Os44Kk44OXXGIpfChcYuODiOODg+ODl+ODrOOCuVxiKXwoXGLjg4njg4PjgrDjgrnjgr/jgqTjg6tcYil8KFxi44OL44Ks44O8XGIpfChcYuODjOODvOODiVxiKXwoXGLjg43jgqrjg7vjg4rjg4FcYil8KFxi44OP44O844OJ44Kz44KiXGIpfChcYuODkOOCpOODluODrOODvOOCv+ODvFxiKXwoXGLjg5Djg4Pjgq/jg7vjgrnjgr/jgqTjg6tcYil8KFxi44OR44Kk44OR44OzXGIpfChcYuODkeODs+ODhuOCo+ODvFxiKXwoXGLjg5Pjg4Pjg4FcYil8KFxi44OV44Kh44OD44KvXGIpfChcYuODleOCoeODs+OCv+OCuOODvFxiKXwoXGLjg5XjgqPjgrnjg4hcYil8KFxi44OV44Kn44OG44Kj44OD44K344OlXGIpfChcYuODleOCp+ODqeODgeOCqlxiKXwoXGLjg5Xjg4Pjgq9cYil8KFxi44OX44Oq44Oz44K5XFcr44Ki44Or44OQ44O844OIXFcr44OU44Ki44K5XGIpfChcYuODl+ODrOOCpOODnOODvOOCpFxiKXwoXGLjg5njgqLjg5Djg4Pjgq9cYil8KFxi44Oa44OL44K5XGIpfChcYuODmuODi+OCueODkOODs+ODiVxiKXwoXGLjg5vjg6JcYil8KFxi44Oc44Oz44OG44O844K4XGIpfChcYuODnOODvOOCpOOCuuODqeODllxiKXwoXGLjg5zjg7zjg6vjgpLoubTjgotcYil8KFxi44Oc44O844Or44Ku44Oj44KwXGIpfChcYuODneODq+ODjlxiKXwoXGLjg53jg6vjg47jgrDjg6njg5XjgqPjg7xcYil8KFxi44Oe44K244O844O744OV44Kh44OD44Kr44O8XGIpfChcYuODnuOCueOCv+ODvOODmeODvOOCt+ODp+ODs1xiKXwoXGLjg6bjg4Djg6TkurpcYil8KFxi44Op44OG44Kj44O844OKXGIpfChcYuODqeODkOODvFxiKXwoXGLjg6njg7Pjgrjjgqfjg6rjg7xcYil8KFxi44Os44Kk44OXXGIpfChcYuODrOOCuuODk+OCouODs1xiKXwoXGLjg63jg6rjg7zjgr9cYil8KFxi44Ot44O844K/44O8XGIpfChcYuS4oeWIgFxiKXwoXGLkuKHmgKdcYil8KFxi5Lih5oCn5YW35pyJXGIpfChcYuS4reWHuuOBl1xiKXwoXGLkubHkuqRcYil8KFxi5Lmz6aaWXGIpfChcYuS6jOeptFxiKXwoXGLkurrlprtcYil8KFxi5Lq656iuXGIpfChcYuWFkOerpeaAp+iZkOW+hVxiKXwoXGLliYPmr5tcYil8KFxi5YuD6LW344GZ44KLXGIpfChcYuWNjVxiKXwoXGLlkIjmhI/jga7mgKfkuqRcYil8KFxi5Zm05Ye6XGIpfChcYuWjsuaYpeWpplxiKXwoXGLlpInmhYtcYil8KFxi5aSi57K+XGIpfChcYuWkp+mZsOWUh1xiKXwoXGLlpbPjga7lrZBcYil8KFxi5aWz5a2Q6auY55SfXGIpfChcYuWls+eOi+anmFxiKXwoXGLlpbPoo4VcYil8KFxi5aW06Zq3XGIpfChcYuWrjOOBhFxiKXwoXGLlrqblrphcYil8KFxi5bCE57K+XGIpfChcYuWwv+mBk+ODl+ODrOOCpFxiKXwoXGLlt6jkubNcYil8KFxi5beo5qC5XGIpfChcYuW5s+aJi+aJk+OBoVxiKXwoXGLlubzlhZBcYil8KFxi5bm85YWQ5oCn5oSb6ICFXGIpfChcYuW8t+WnpueKr1xiKXwoXGLlvozog4zkvY1cYil8KFxi5oCn5LqkXGIpfChcYuaJi+OCs+OCrVxiKXwoXGLmi7fllY9cYil8KFxi5oy/5YWlXGIpfChcYuaUr+mFjVxiKXwoXGLmlrDjgZfjgYTjg53jg6vjg45cYil8KFxi5q2j5bi45L2NXGIpfChcYuauuuOBl+aWuVxiKXwoXGLmrrrkurrkuovku7ZcYil8KFxi5q665Lq65pa55rOVXGIpfChcYuavm+a3seOBhFxiKXwoXGLmt6vkubFcYil8KFxi5r2u5ZC544GN5aWzXGIpfChcYua9ruWQueOBjeeUt+aAp1xiKXwoXGLnjaPlp6ZcYil8KFxi546J44Gq44KBXGIpfChcYueOieiIkOOCgVxiKXwoXGLnlJ/mrpblmahcYil8KFxi55u06IW4XGIpfChcYueyvua2slxiKXwoXGLns55cYil8KFxi57Oe5L6/XGIpfChcYueznuWwv+aEm+WlveeXh1xiKXwoXGLnt4rnuJtcYil8KFxi57ib44KKXGIpfChcYuiCm+mWgFxiKXwoXGLohLHooaNcYil8KFxi6IajXGIpfChcYuiHquW3seaEm+aAp1xiKXwoXGLojLboibLjga7jgrfjg6Pjg6/jg7xcYil8KFxi6KO4XGIpfChcYuijuOOBruWls+aAp1xiKXwoXGLoppfjgY1cYil8KFxi6KqY5oORXGIpfChcYuiynuaTjeW4r1xiKXwoXGLotrPjgpLluoPjgZLjgotcYil8KFxi6Laz44OV44Kn44OBXGIpfChcYui8quWnplxiKXwoXGLov5Hopqrnm7jlp6ZcYil8KFxi6Zmw5q+bXGIpfChcYumdqeaKkeWItlxiKXwoXGLpqI7kuIrkvY1cYil8KFxi6buS5Lq6XGIp"), "ig");
profanity_regex["nl"] = new RegExp(atob("KFxiYWZydWtrZW5cYil8KFxiYWZ0cmVra2VuXGIpfChcYmFmd2Vya3BsYWF0c1xiKXwoXGJhZnplaWtlblxiKXwoXGJhZnp1aWdlblxiKXwoXGJhc29cYil8KFxiYmVmYm9yc3RlbFxiKXwoXGJiZWZmZW5cYil8KFxiYm9lcmVsdWxcYil8KFxiYm9ra2VsdWxcYil8KFxiYm90ZXJnZWlsXGIpfChcYmRvbWJvXGIpfChcYmRyb29nZ2VpbGVyXGIpfChcYmVlblxXK3dpcFxXK21ha2VuXGIpfChcYmZsaWtrZXJcYil8KFxiZ2FkdmVyZGFtbWVcYil8KFxiZ2VpbG5lZWZcYil8KFxiZ29kdmVyZG9tbWVcYil8KFxiZ3JhdGVua3V0XGIpfChcYmhvZXJcYil8KFxiaG9lcmVuYnV1cnRcYil8KFxiaG9lcmVubG9wZXJcYil8KFxiaG9lcmlnXGIpfChcYmh1ZnRlclxiKXwoXGJrbGFhcmtvbWVuXGIpfChcYmtsb2pvXGIpfChcYmtsb290emFrXGIpfChcYmtsb3RlblxiKXwoXGJrb250bmV1a2VuXGIpfChcYmt1dFxiKXwoXGJrdXR0ZWxpa2tlcnRqZVxiKXwoXGJsaWVmZGVzZ3JvdFxiKXwoXGJsdWxcYil8KFxibHVsLWRlLWJlaGFuZ2VyXGIpfChcYmx1bGhhbm5lc1xiKXwoXGJtb2ZcYil8KFxibmV1a2VuXGIpfChcYm5ldWtzdGllclxiKXwoXGJvcGdlaWxlblxiKXwoXGJvcGthbmtlcmVuXGIpfChcYm9wcm90dGVuXGIpfChcYm9wc29kZW1pZXRlcmVuXGIpfChcYm9wem91dGVuXGIpfChcYm91d2VcVytydWtrZXJcYil8KFxicGFhcmRlbHVsXGIpfChcYnBpanBiZWtraWVcYil8KFxicGlrXGIpfChcYnBsZXVyaXNsYWFpZXJcYil8KFxicG9lcFxiKXwoXGJwb2VwZW5cYil8KFxicG9ydGlla3NsZXRcYil8KFxicG90XGIpfChcYnJlZXRcYil8KFxicmVldHJpZGRlclxiKXwoXGJyb3Rob2VyXGIpfChcYnJvdHpha1xiKXwoXGJydWtrZW5cYil8KFxic2Nob2Z0XGIpfChcYnNoaXRcYil8KFxic2xldFxiKXwoXGJzbGV0dGVyaWdcYil8KFxic3RhbmRqZS02OVxiKXwoXGJ0ZXJpbmdsaWplclxiKXwoXGJ0b25nem9lbmdcYil8KFxidmVya2xvdGVuXGIpfChcYnZlcm5ldWtlblxiKXwoXGJ2aWVzcGV1a1xiKXwoXGJ2aW5nZXJlblxiKXwoXGJ6YWtrZW53YXNzZXJcYil8KFxiemVpa2VuXGIpfChcYnplaWtlclxiKXwoXGJ6dWlwbGFwXGIp"), "ig");
profanity_regex["pl"] = new RegExp(atob("KFxiY2lwYVxiKXwoXGJjeWNraVxiKXwoXGJHc3dub1xiKXwoXGJkdXBhXGIpfChcYmR1cGVjemthXGIpfChcYkphXFcrSmViaWVcYil8KFxiSmFcVytwaWVyZG9sZVxiKQ=="), "ig");
profanity_regex["pt"] = new RegExp(atob("KFxiYW5hbFxiKXwoXGJhbnVzXGIpfChcYmJhdFx3KlxXKnB1bmhldFx3KlxiKXwoXGJiYXRcdypcVyp1bWFcVypwdW5oZXRcdypcYil8KFxiYmljaChhfG9uYSlcdz9cYil8KFxiYmlzY2F0XHcqXGIpfChcYmIob3x1KWNldFx3KlxiKXwoXGJib2lvbFx3KlxiKXwoXGJib3F1ZXRlXHcqXGIpfChcYmJvc3QoYXxpbmhhKVx3P1xiKXwoXGJicm9jaGFcdz9cYil8KFxiYnJvY2hhbihkb3x0ZSlcYil8KFxiYnJvY2goZWl8b3UpXGIpfChcYmJ1bmQoYXxhb3xpbmhhfG9lfG9uYSlcdz9cYil8KFxiY2FiYWMob3xhb3xpbmhvKVx3P1xiKXwoXGJjYWNldGVcYil8KFxiY2FnKGF8b3xvZXxvdSlcdz9cYil8KFxiY2FnYShkYXxkb3xuZG98c3NlKVxiKXwoXGJjYWd1KGV8ZWl8ZW0pXGIpfChcYmNhcmFsaFx3KlxiKXwoXGJjbGl0b3Jpc1xiKXwoXGJjb25hXGIpfChcYmNvcm4oYXxpbmgpb1x3P1xiKXwoXGJjb3Jub1xiKXwoXGJjdVxiKXwoXGJjdXooYW98b2V8aW5obylcdz9cYil8KFxiY2h1cFx3KlxXK1x3KlxXK2JvbGFcdypcYil8KFxiY2h1cFx3KlxXK1x3KlxXK3BhdVx3KlxiKXwoXGJjaHVwXHcqXFcrXHcqXFcrKHBpY2F8cm9sYSlcdz9cYil8KFxiY2h1cFx3KlxXK1x3KlxXK292b1x3KlxiKXwoXGJjdXJyYShyfGQpXHcqXGIpfChcYmRlc2NhYmFjXHcqXGIpfChcYmQoaXxlKXNncmFjXHcqXGIpfChcYmQoaXxlKXNncmFzXHcqXGIpfChcYmQoaXxlKXNncmFtXHcqXGIpfChcYmVuZmlcdypcVypub1xXKlx3KlxXKnJhYm9cYil8KFxiZW5yYWIoYXxlfG8pXHcqXGIpfChcYmVyb3RpXHcqXGIpfChcYmVzcG9yclx3KlxiKXwoXGJmZHBcYil8KFxiZlx3KlxXKmRcdypcVypwdXRhXHc/XGIpfChcYmZcdyphXFcqZGFcdypcVypwdXRhZ2VtXGIpfChcYmZcdypcVypkXHcqXFcqXHcqXFcqY2FkZWxhXHc/XGIpfChcYmZcdypcVypkXHcqXFcqXHcqXFcqcHJvc3RpdHV0YVx3P1xiKXwoXGJmXHcqXFcqZFx3KlxXKlx3KlxXKnB1dGFcdz9cYil8KFxiZlx3KlxXKmRcdypcVypcdypcVyp2YWRpYVx3P1xiKXwoXGJmb2RhXHc/XGIpfChcYmYob3x1KWRlXHcqXGIpfChcYmYob3x1KWRlXHcqLVx3K1xiKXwoXGJmKG98dSlkaWRcdypcYil8KFxiaGVudGFpXGIpfChcYm1hc3QodXx1ciliXHcqXGIpfChcYihtfHN8dCllXFcqZihvfHUpZGVcdypcYil8KFxibWVyZFx3KlxiKXwoXGJtZXRcdypcVypub1xXKlx3KlxXKnJhYm9cYil8KFxib3JnYXNtb1x3P1xiKXwoXGJvcmdpYVx3P1xiKXwoXGJwYW5lbGVpclx3KlxiKXwoXGJwZWRvZmlsXHcqXGIpfChcYnBlbmlzXGIpfChcYnBlbnRlbGhcdz9cYil8KFxicG9ybm9cYil8KFxicG9ybm9ncmFmXHcqXGIpfChcYnBvcnJhXGIpfChcYnBxcFxiKXwoXGJwcm9zdGl0dVx3KlxiKXwoXGJwdW5oZXRcdypcYil8KFxicHV0YVx3P1xiKXwoXGJwdXRhXFcqbWVyZGFcYil8KFxicHV0YVxXKnF1KGV8aSlcVypwYXJpKHV8bylcYil8KFxicHV0YXJpYVx3P1xiKXwoXGJwdXRlaXJvXHc/XGIpfChcYnB1dGluaChhfG8pXHc/XGIpfChcYnB1dG9cdz9cYil8KFxicHV0b25hXHc/XGIpfChcYnF1ZWltYVxXKnJvc2NhXGIpfChcYnF1ZWltXHcqXFcqXHcqKGF8ZSlcVypyb3NjYVxiKXwoXGJyYWJ1ZChhfG98b25hKVx3P1xiKXwoXGJyYW1laXJhXHc/XGIpfChcYnNhY2FuYVxiKXwoXGJzYWNhbmFnZVx3KlxiKXwoXGJzYWNhbmVcdypcYil8KFxiKGxofHN8dCllXFcrZmVycmFyXGIpfChcYnNleChvfHkpXGIpfChcYnNpcmlyaShjfHEpXHcqXGIpfChcYnNvZG9taVx3KlxiKXwoXGJ0YXF1KGV8aSlwYXJpKHV8bylcYil8KFxidGFyYWRcdypcYil8KFxidGVzYW9cYil8KFxidGVzdWRcdypcYil8KFxidG5jXGIpfChcYnRvYmFcYil8KFxidG9tXHcqXFcqbm9cVypjdVxiKXwoXGJ0b21cdypcVypub1xXKlx3ezN9XFcqY3VcYil8KFxidHJhbnNhXHc/XGIpfChcYnRyYW5zYShtb3N8bmRvKVxiKXwoXGJ0cmFucyhlaXxvKVx3P1xiKXwoXGJ0cmVwYWRhXHc/XGIpfChcYnZhZGkoYXxhcylcYil8KFxidmFnYWJ1bmQoYXxhcylcYil8KFxidihlfGkpYWRvXHc/XGIpfChcYnYoZXxpKWFkYW9cYil8KFxidihlfGkpYWRhZ1x3KlxiKXwoXGJ2KGV8aSlhZGlcdypcYil8KFxidnNmXGIpfChcYnZ0bmNcYil8KFxieGFuKGF8YXMpXGIpfChcYnhhbmluaChhfGFzKVxiKXwoXGIoeG98Y2hvKSh4b3xjaG8pdGFcdz9cYik="), "ig");
profanity_regex["ro"] = new RegExp(atob("KFxiZnV0ZVxiKXwoXGJmdXR1XGIpfChcYkN1cnZhXGIpfChcYmJvdVxiKQ=="), "ig");
profanity_regex["ru"] = new RegExp(atob("KFxiYnljaGFyYVxiKXwoXGJieWtcYil8KFxiY2hlcm5vemhvcHlpXGIpfChcYmRvbGJveSdlYlxiKXwoXGJlYmFsbmlrXGIpfChcYmViYWxvXGIpfChcYmViYWxvbVxXK3NjaCdlbGthdFxiKXwoXGJnb2xcYil8KFxibXVkYWNrXGIpfChcYm9waXpkZW5ldFxiKXwoXGJvc3RvJ2VibG9cYil8KFxib3N0b2todWl0ZWwnbm9cYil8KFxib3QnZWJpc1xiKXwoXGJvdG11ZG9oYXRcYil8KFxib3RwaXpkaXRcYil8KFxib3Rzb3NpXGIpfChcYnBhZGxvXGIpfChcYnBlZGlrXGIpfChcYnBlcmRldFxiKXwoXGJwZXR1aFxiKXwoXGJwaWRhclxXK2dub2lueWpcYil8KFxicGl6J2RldFxiKXwoXGJwaXpgZHl1bGluYVxiKXwoXGJwaXpkJ3VrXGIpfChcYnBpemRhXGIpfChcYnBpemRhdG9cYil8KFxicGl6ZGF0eWlcYil8KFxicGl6ZGV0Y1xiKXwoXGJwaXpkb2lcVytuYWtyeXQnc2phXGIpfChcYnBvXFcra2h1eVxiKXwoXGJwbydpbWF0J1xXK25hXFcra29uY2hpa1xiKXwoXGJwbydpdGlcVytwb3NyYXRcYil8KFxicG9kaVxXK2t1J2V2b1xiKXwoXGJwb2ViZW5cYil8KFxicG9sdWNoaXRcVytwaXpkeVxiKXwoXGJwb3Nvc2lcVyttb3l1XFcra29uZmV0a3VcYil8KFxicHJpc3NhdFxiKXwoXGJwcm9lYmF0XGIpfChcYnByb211ZG9ibCdhZHNrc3lhXFcrcGl6ZG9wcm8nZWJpbmFcYil8KFxicHJvcGV6ZG9sb2NoXGIpfChcYnByb3NyYXRcYil8KFxicmFzcGVlemRleWlcYil8KFxicmFzcGl6ZGF0eWlcYil8KFxicmF6J3llYnV5XGIpfChcYnJheid5b2JhXGIpfChcYnMnZWJhdCdzeWFcYil8KFxic2hhbGF2YVxiKXwoXGJzdHllcnZvXGIpfChcYnN1a2luXFcrc3luXGIpfChcYnN2b2RpdFxXK3Bvc3JhdFxiKXwoXGJzdm9sb2NoXGIpfChcYnRyYWtoYXQnc3lhXGIpfChcYnRyaW1hbmRvYmx5ZHNraXlcVytwaXpkb3Byb3lvYlxiKXwoXGJ1J2ViaXRzY2hlXGIpfChcYnVibCd5dWRva1xiKXwoXGJ1Ym95XGIpfChcYnZcVytwaXpkdVxiKXwoXGJ2YWZsJ2FcYil8KFxidmFmbGlcVytsb3ZpdFxiKXwoXGJ2eXBlcmR5c2hcYil8KFxidnpkcm9jaGVubnlpXGIpfChcYnllYlxXK3Zhc1xiKXwoXGJ6YSdlYmF0XGIpfChcYnphZWJpc1xiKXwoXGJ6YWx1cGFcYil8KFxiemFsdXBhdFxiKXwoXGJ6YXNyYW5ldGNcYil8KFxiemFzc2F0XGIpfChcYnpsbydlYnVjaHlcYil8KFxi0LHQsNGA0LTQsNC6XGIpfChcYtCx0LfQtNGR0L3QvtC6XGIpfChcYtCx0LvRj9C00LrQuFxiKXwoXGLQsdC70Y/QtNC+0LLQsNGC0YxcYil8KFxi0LHQu9GP0LTRgdGC0LLQvlxiKXwoXGLQsdC70Y/QtNGMXGIpfChcYtCx0YPQs9C+0YBcYil8KFxi0LLQvlxXK9C/0LjQt9C00YNcYil8KFxi0LLRgdGC0LDRgtGMXFcr0YDQsNC60L7QvFxiKXwoXGLQstGL0ZHQsdGL0LLQsNGC0YzRgdGPXGIpfChcYtCz0LDQvdC00L7QvVxiKXwoXGLQs9C+0LLQvdC+XGIpfChcYtCz0L7QstC90Y7QulxiKXwoXGLQs9C+0LvRi9C5XGIpfChcYtC00LDRgtGMXFcr0L/QuNC30LTRi1xiKXwoXGLQtNC10YDRjNC80L5cYil8KFxi0LTRgNC+0YfQuNGC0YxcYil8KFxi0LTRgNGD0LPQvtC5XFcr0LTRgNCw0LfQvdC40YLRgdGPXGIpfChcYtC10LHQsNGC0YxcYil8KFxi0LXQsdCw0YLRjC3QutC+0L/QsNGC0YxcYil8KFxi0LXQsdC70L5cYil8KFxi0LXQsdC90YPRgtGMXGIpfChcYtC20L7Qv9CwXGIpfChcYtC20L7Qv9C+0LvQuNC3XGIpfChcYtC40LPRgNCw0YLRjFxXK9C90LBcVyvQutC+0LbQsNC90L7QuVxXK9GE0LvQtdC50YLQtVxiKXwoXGLQuNC30LzRg9C00L7RhdCw0YLRjFxiKXwoXGLQutCw0LbQtNGL0LlcVyvQtNGA0L7Rh9C40YJcVyvQutCw0LpcVyvQvtC9XFcr0YXQvtGH0LXRglxiKXwoXGLQutCw0LpcVyvQtNCy0LBcVyvQv9Cw0LvRjNGG0LBcVyvQvtCx0L7RgdGB0LDRgtGMXGIpfChcYtC60LDQutCw0Y9cVyvRgNCw0LfQvdC40YbQsFxiKXwoXGLQutGD0YDQuNGC0LVcVyvQvNC+0Y5cVyvRgtGA0YPQsdC60YNcYil8KFxi0LvRi9GB0L7Qs9C+XFcr0LJcVyvQutGD0LvQsNC60LVcVyvQs9C+0L3Rj9GC0YxcYil8KFxi0LzQsNC70L7RhNGPXGIpfChcYtC80LDQvdC00LBcYil8KFxi0LzQsNC90LTQsNCy0L7RiNC60LBcYil8KFxi0LzQtdC90YJcYil8KFxi0LzRg9C00LBcYil8KFxi0LzRg9C00LjQu9C+XGIpfChcYtC80YPQtNC+0LfQvNC+0L1cYil8KFxi0L3QsFxXK9GE0LjQs1xiKXwoXGLQvdCwXFcr0YXRg9C5XGIpfChcYtC90LBcVyvRhdGD0Y5cVyvQstC10YDRgtC10YLRjFxiKXwoXGLQvdCwXFcr0YXRg9GPXGIpfChcYtC90LDQtdCx0LDRgtGMXGIpfChcYtC90LDQtdCx0LXQvdC40YLRjNGB0Y9cYil8KFxi0L3QsNC10LHQvdGD0YLRjNGB0Y9cYil8KFxi0L3QsNGF0YPRj9GH0LjRgtGM0YHRj1xiKXwoXGLQvdC1XFcr0LXQsdC10YJcYil8KFxi0L3QtdCy0LXQsdC10L3QvdGL0LlcYil8KFxi0L3QuFxXK9C30LBcVyvRhdGD0LlcVyvRgdC+0LHQsNGH0YNcYil8KFxi0L3QuFxXK9GF0YPRj1xiKXwoXGLQvtCx0L3QsNC20LXQvdC90YvQuVxiKXwoXGLQvtCx0L7RgdGB0LDRgtGM0YHRj1xXK9C80L7QttC90L5cYil8KFxi0L7QtNC40L1cVyvQtdCx0ZHRgtGB0Y9cYil8KFxi0L7Qv9C10YHQtNC+0LtcYil8KFxi0L7RhNC40LPQtdGC0YxcYil8KFxi0L7RhdGD0LXRgtGMXGIpfChcYtC+0YXRg9C50YLQtdC70YzQvdC+XGIpfChcYtC/0L7Qu9C+0LLQvtC1XFcr0YHQvdC+0YjQtdC90LjQtVxiKXwoXGLRgdC10LrRgVxiKXwoXGLRgdC40YHQutC4XGIpfChcYtGB0L/QuNC30LTQuNGC0YxcYil8KFxi0YHRgNCw0YLRjFxiKXwoXGLRgdGB0LDRgtGMXGIpfChcYtGC0YDQsHjQsNGC0YxcYil8KFxi0YLRi1xXK9C80L3QtVxXK9Cy0LDQvdGM0LrRg1xXK9C90LVcVyvQstCw0LvRj9C5XGIpfChcYtGE0LjQs9CwXGIpfChcYtGF0LDQv9Cw0YLRjFxiKXwoXGLRhdC10YBcVyvRgVxXK9C90LXQuVxiKXwoXGLRhdC10YBcVyvRgVxXK9C90LjQvFxiKXwoXGLRhdC+0YXQvtC7XGIpfChcYtGF0YDQtdC9XGIpfChcYtGF0YPQtdC8XFcr0LPRgNGD0YjQuFxXK9C+0LrQvtC70LDRh9C40LLQsNGC0YxcYil8KFxi0YXRg9C10L/Qu9C10YJcYil8KFxi0YXRg9C40LvQvlxiKXwoXGLRhdGD0LjQvdC10LlcVyvRgdGC0YDQsNC00LDRgtGMXGIpfChcYtGF0YPQuNC90Y9cYil8KFxi0YXRg9C5XGIpfChcYtGF0YPQuVxXK9C/0LjQvdCw0YLRjFxiKXwoXGLRhdGD0LnQvdGD0YLRjFxiKXwoXGLRhdGD0ZHQstC+XGIpfChcYtGF0YPRkdCy0YvQuVxiKXwoXGLRkdCxXFcr0YLQstC+0Y5cVyvQvNCw0YLRjFxiKXwoXGLRkdCx0LDRgNGMXGIp"), "ig");
profanity_regex["zh_CN"] = new RegExp(atob("KFxi5oiQ5Lq6XGIpfChcYuWkhOWls1xiKXwoXGLlj6PkuqRcYil8KFxi6L+36I2vXGIpfChcYuaAp+eIsVxiKXwoXGLmgKflmahcYil8KFxi6Zi06IyOXGIpfChcYua3q+S5sVxiKXwoXGLmgKfkuqRcYil8KFxi5r+A5oOFXGIpfChcYuS5nea4uFxiKXwoXGLnp4HmnI1cYil8KFxi5omS5YWJXGIpfChcYueZveeXtFxiKXwoXGLnmb3nmaFcYil8KFxi55m954OCXGIpfChcYuWMheearlxiKXwoXGLnrKjom4tcYil8KFxi6Imy5oOFXGIpfChcYuaDheiJslxiKXwoXGLlq5blqLxcYil8KFxi5Y2W5rerXGIpfChcYua3q+envVxiKXwoXGLlsYRcYil8KFxi6YC8XGIpfChcYumAvOagt1xiKXwoXGLlqYrlrZBcYil8KFxi5amK5a2Q5YW755qEXGIpfChcYuaTjeacuuaOsFxiKXwoXGLmk43lprNcYil8KFxi5pON5aaz5aaIXGIpfChcYuaTjeWms+WomFxiKXwoXGLmk43lprPlhajlrrZcYil8KFxi5pON5aaz56WW5a6XXGIpfChcYuaTjeS9oOWFqOWutlxiKXwoXGLmk43kvaDnpZblrpdcYil8KFxi5oeG5oKo5aaIXGIpfChcYuaHhuaCqOWomFxiKXwoXGLogo9cYil8KFxi5o+S5L2gXGIpfChcYuaPkuatu+S9oFxiKXwoXGLlkIPlsY5cYil8KFxi5ZC5566rXGIpfChcYuaJk+eCrlxiKXwoXGLojaHlpodcYil8KFxi5bGMXGIpfChcYuaUvuiNoVxiKXwoXGLogqXopb9cYil8KFxi5bmyeOWomFxiKXwoXGLlubLmnLrmjrBcYil8KFxi5bmy5aaz6ICB5q+NXGIpfChcYuW5suWms+WmiFxiKXwoXGLlubLlprPpqaxcYil8KFxi5bmy5aaz5aiYXGIpfChcYuW5suS9oOiAgeavjVxiKXwoXGLlubLkvaDoia9cYil8KFxi5bmy5L2g5aiYXGIpfChcYuW5suaCqOWomFxiKXwoXGLlubLkuIPlhatcYil8KFxi5bmy5q27Q1NcYil8KFxi5bmy5q27R01cYil8KFxi5bmy5q275a6i5pyNXGIpfChcYuW5suatu+S9oFxiKXwoXGLlublcYil8KFxi6LWj5oKo5aiYXGIpfChcYueBqOS9oOWomFxiKXwoXGLni5fni7zlhbvnmoRcYil8KFxi54uX5bGBXGIpfChcYum+n+WEv+WtkFxiKXwoXGLpvp/lpLRcYil8KFxi6ay85YWsXGIpfChcYuiKseafs1xiKXwoXGLmnLrlhatcYil8KFxi5py65be0XGIpfChcYuacuuacuuatquatqlxiKXwoXGLpuKE4XGIpfChcYum4oeWFq1xiKXwoXGLpuKHlj61cYil8KFxi6bih5ZCnXGIpfChcYum4oeiKrVxiKXwoXGLpuKHpuKFcYil8KFxi6bih5aW4XGIpfChcYumbnuW3tFxiKXwoXGLlh6DlhatcYil8KFxi5Yeg5be0XGIpfChcYuWHoOWPrVxiKXwoXGLlh6Doiq1cYil8KFxi5aaTXGIpfChcYuWmk+Wls1xiKXwoXGLlppPpmaJcYil8KFxi5aW4XGIpfChcYuWluOS9oFxiKXwoXGLlp6ZcYil8KFxi6LSxQlxiKXwoXGLotLHotKdcYil8KFxi6LSx5Lq6XGIpfChcYuizpFxiKXwoXGLkuqTphY1cYil8KFxi5aej6KW/XGIpfChcYuWPq+W6ilxiKXwoXGLlpbnpqaznmoRcYil8KFxi5Yab5aaTXGIpfChcYumdoOeIuFxiKXwoXGLpnaDljJdcYil8KFxi6Z2g6IOMXGIpfChcYumdoOavjVxiKXwoXGLpnaDohbBcYil8KFxi5Y+j6IKvXGIpfChcYuaHkjhcYil8KFxi5oeS5YWrXGIpfChcYuaHkuWPq1xiKXwoXGLmh5LmlZlcYil8KFxi54OC6YC8XGIpfChcYueDgui0p1xiKXwoXGLniJtcYil8KFxi5rWq5Y+rXGIpfChcYuiAgeS6jFxiKXwoXGLogIHmr41cYil8KFxi6ICB5ZGzXGIpfChcYui9ruWluFxiKXwoXGLlpohCXGIpfChcYuWmiOmAvFxiKXwoXGLlpojmr5RcYil8KFxi5aaI55qEXGIpfChcYuWmiOeahEJcYil8KFxi5aaI5LiqQlxiKXwoXGLlpojlpojnmoRcYil8KFxi5Y2WQlxiKXwoXGLljZbmr5RcYil8KFxi5rer6I2hXGIpfChcYua3q+Wmh1xiKXwoXGLmt6vopb9cYil8KFxi5aW25a2QXGIpfChcYuWms+WlueWmiOeahFxiKXwoXGLlprPogIHmr43nmoRcYil8KFxi5aaz5aaI55qEXGIpfChcYuWms+mprOeahFxiKXwoXGLlprPlqJjnmoRcYil8KFxi5L2g5aW56ams55qEXGIpfChcYuS9oOWmiFxiKXwoXGLkvaDlpojnmoRcYil8KFxi5L2g6ams55qEXGIpfChcYuS9oOWomFxiKXwoXGLkvaDlqJjljaHlpb1cYil8KFxi5L2g5aiY5ZKnXGIpfChcYuS9oOWFqOWutlxiKXwoXGLkvaDmmK/puKFcYil8KFxi5L2g5piv6bitXGIpfChcYuS9oOS7lumprOeahFxiKXwoXGLkvaDlroPlpojnmoRcYil8KFxi5L2g5a6D6ams55qEXGIpfChcYuWxgeiCoVxiKXwoXGLmnIjnu49cYil8KFxi5p2C56eNXGIpfChcYuelluWul1xiKXwoXGLlgZrniLFcYil8KFxi5auW5a6iXGIpfChcYuWnmOWktFxiKXwoXGLku4booZdcYil8KFxi5by65aW45L2gXGIpfChcYuaXpeS9oFxiKXwoXGLml6Xku5blqJhcYil8KFxi5Lmz5aS0XGIpfChcYuaSkuWwv1xiKXwoXGLloZ7kvaDniLhcYil8KFxi5aGe5L2g5YWsXGIpfChcYuWhnuS9oOiAgeavjVxiKXwoXGLloZ7kvaDogIHluIhcYil8KFxi5aGe5L2g5q+NXGIpfChcYuWhnuS9oOWomFxiKXwoXGLotZvlprPpmL/mr41cYil8KFxi6LWb5L2g6ICB5q+NXGIpfChcYuS4iee6p+eJh1xiKXwoXGLpqprpgLxcYil8KFxi6am25L2g54i4XGIpfChcYumptuS9oOWFrFxiKXwoXGLpqbbkvaDogIHmr41cYil8KFxi6am25L2g6ICB5biIXGIpfChcYumptuS9oOavjVxiKXwoXGLpqbbkvaDlqJhcYil8KFxi5YK75q+UXGIpfChcYuWwhOeyvlxiKXwoXGLlsITkvaBcYil8KFxi5LuW5aaIXGIpfChcYuS7luWmiOOEieeOi+WFq+ibi1xiKXwoXGLku5bpqaznmoRcYil8KFxi5LuW5aW25aiY55qEXGIpfChcYuS7luWomFxiKXwoXGLku5blpbblpbbnmoRcYil8KFxi5LuW5aW25aW2XGIpfChcYuWklumYtFxiKXwoXGLnjovlhavom4tcYil8KFxi5LiL6LSxXGIpfChcYuS4i+S4ieeDglxiKXwoXGLmgKfniLFcYil8KFxi5oCn5LqkXGIpfChcYuaAp+aXoOiDvVxiKXwoXGLpmLPlhbdcYil8KFxi6Ziz6JCOXGIpfChcYumHjum4oVxiKXwoXGLmgKdcYil8KFxi6Zi05ZSHXGIpfChcYumYtOavm1xiKXwoXGLmi5vlppNcYil8KFxi5bCP6bih6bihXGIpfChcYuWwj+m4oeW3tFxiKXwoXGLlpKfpuKHlt7RcYil8KFxi5Y21XGIpfChcYueyvuWtkFxiKXwoXGLljbXlrZBcYil8KFxi5aSn5Y215a2QXGIpfChcYuWkp+WNteazoVxiKXwoXGLlsI/ljbXlrZBcYil8KFxi5bCP5Y215rOhXGIpfChcYumYtOiMjlxiKXwoXGLpmLTpgZNcYil8KFxi6Zi06YOoXGIpfChcYuWxgeecvFxiKXwoXGLlpbZcYil8KFxi5aaI5Liq5q+UXGIpfChcYuWmiOS4quiAgeavlFxiKXwoXGLlvLrlpbhcYil8KFxi5rerXGIpfChcYua3q+ajjVxiKXwoXGLkubPmiL9cYil8KFxi5LmzXGIpfChcYueYquS4iVxiKXwoXGLliJrnmKrkuIlcYil8KFxi5bCP55iq5LiJXGIpfChcYuiAgeeYquS4iVxiKXwoXGLljYHkuInngrlcYil8KFxi5Yia5bqmXGIpfChcYuWGjOmCo1xiKXwoXGLlsI/kubPlpLRcYil8KFxi6bih5be0XGIpfChcYumYtOaIt1xiKXwoXGLmub/pgI/nmoTlhoXoo6RcYil8KFxi6IKJ57ydXGIpfChcYuiCieajklxiKXwoXGLmt6vmsLRcYil8KFxi6IKJ5aOBXGIpfChcYuiCieajjeWtkFxiKXwoXGLlj6PkuqRcYil8KFxi6IKb5LqkXGIpfChcYuWwj+iCieeyklxiKXwoXGLpmLTmoLhcYil8KFxi5beo5LmzXGIpfChcYuaXpeS9oOWmiFxiKXwoXGLml6XkvaDogIHmr41cYil8KFxi5pel5L2g6ICB5aiYXGIpfChcYuaXpeaJuVxiKXwoXGLlubLkvaDlpohcYil8KFxi5L2g5aW25aW255qEXGIpfChcYui0vOS9oOWmiFxiKXwoXGLmk43kvaBcYil8KFxi5pON5L2g5aaIXGIpfChcYuaTjeS9oOWomFxiKXwoXGLmk43kvaDlpbblpbZcYil8KFxi5pON5L2g6ICB5q+NXGIpfChcYuaTjeS9oOiAgeWmiFxiKXwoXGLlqJjnmoRcYil8KFxi5aiY5Liq5q+UXGIpfChcYuS7luWmiOeahFxiKXwoXGLlpbnlpojnmoRcYil8KFxi5a6D5aaI55qEXGIpfChcYuS7luWmiOWcsFxiKXwoXGLlpbnlpojlnLBcYil8KFxi5a6D5aaI5ZywXGIpfChcYuaIkeaTjeS9oOelluWul+WNgeWFq+S7o1xiKXwoXGLlpbblpbbnmoTnhopcYil8KFxi5L2g5Liq5YK75q+UXGIpfChcYuS4quiAgeWtkOeahFxiKXwoXGLpqprotKdcYil8KFxi6aqa5q+UXGIpfChcYuWwj+mqmui0p1xiKXwoXGLlsI/pqprmr5RcYil8KFxi6ICB6aqa6LSnXGIpfChcYuiAgemqmuavlFxiKXwoXGLnk5zlqIPlrZBcYil8KFxi55Oc5amG5aiYXGIpfChcYueTnOaJuVxiKXwoXGLlubLkvaBcYil8KFxi5pON5q+UXGIpfChcYuaTjemAvFxiKXwoXGLlkI7luq1cYil8KFxi5Y+M5bOw5b6u6aKkXGIpfChcYui0neiCiVxiKXwoXGLnjonmnbVcYil8KFxi5a+G5rSeXGIpfChcYuaKveaPklxiKXwoXGLkubPms6Loh4DmtapcYil8KFxi5Lmz5LqkXGIpfChcYuaJk+mjnuaculxiKXwoXGLlgrvpgLxcYil8KFxi5oOz5LiK5L2gXGIpfChcYueLl+aXpVxiKQ=="), "ig");


/* this needs to be declared after profanity_regex has been populated */
preferences.watch("profanity-filter", (_filters) => {
    filters = {};
    for (const lang in _filters) {
        if (_filters[lang] && lang in profanity_regex) {
            filters[lang] = true;
        }
    }
});
