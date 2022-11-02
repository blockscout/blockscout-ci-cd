{{- define "geth_env" }}
{{- range $key, $value := .Values.geth.environment }}
{{- $item := get $.Values.geth.environment $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}

{{- define "client_env" }}
{{- range $key, $value := .Values.geth.client.environment }}
{{- $item := get $.Values.geth.client.environment $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}
