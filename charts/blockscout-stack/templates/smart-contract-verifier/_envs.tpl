{{- define "scVerifier_env" }}
{{- range $key, $value := .Values.scVerifier.environment }}
{{- $item := get $.Values.scVerifier.environment $key }}
{{- if or (kindIs "string" $item) (kindIs "int64" $item) (kindIs "bool" $item)}}
- name: {{ $key }}
  value: {{ $value | quote }}
{{- else }}
- name: {{ $key }}
  value: {{ pluck $.Values.global.env $item | first | default $item._default | quote }}
{{- end }}
{{- end }}
{{- end }}
